import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import base64 from 'react-native-base64';
import {WebView} from 'react-native-webview';

const TestPayment = () => {
  const [merchantSessionKey, setMerchantSessionKey] = useState(null);
  const [cardIdentifier, setCardIdentifier] = useState(null);

  const generateVendorTxCode = () => {
    // You can use a combination of factors such as a timestamp and a random number to ensure uniqueness.
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 10000); // Change this range as needed.

    // Combine the timestamp and random value to create the vendorTxCode.
    const vendorTxCode = `${timestamp}-${randomValue}`;
    return vendorTxCode;
  };

  // Usage:
  const newVendorTxCode = generateVendorTxCode();

  const getMerchantSessionKey = async () => {
    try {
      const requestBody = {
        vendorName: 'sandbox',
      };
      const apiUrl = `https://sandbox.opayo.eu.elavon.com/api/v1/merchant-session-keys`;

      // Encode the credentials for HTTP Basic Authentication
      const encodedCredentials = base64.encode(
        'hJYxsw7HLbj40cB8udES8CDRFLhuJ8G54O6rDpUXvE6hYDrria:o2iHSrFybYMZpmWOQMuhsXP52V4fBtpuSDshrKDSWsBY1OiN6hwd9Kb12z4j5Us5u',
      );

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      // Set the merchant session key in the state
      setMerchantSessionKey(response.data.merchantSessionKey);
      console.log('Response payment:', response.data?.merchantSessionKey);
    } catch (error) {
      console.error('Error in merchant key:', error);
    }
  };
  const getCardIdentifiers = async () => {
    try {
      const cardDetails = {
        cardDetails: {
          cardholderName: 'Squidward Tentacles',
          cardNumber: '4929000000006',
          expiryDate: '0223',
          securityCode: '123',
        },
      };
      const apiUrl = `https://sandbox.opayo.eu.elavon.com/api/v1/card-identifiers`;
      const res = await axios.post(apiUrl, cardDetails, {
        headers: {
          Authorization: `Bearer ${merchantSessionKey}`,
        },
      });
      console.log('cardidentifiers', res.data?.cardIdentifier);
      setCardIdentifier(res?.data?.cardIdentifier);
      getTransactions(res?.data?.cardIdentifier);
    } catch (error) {
      console.log('error in card identifiers', error);
    }
  };

  const getTransactions = async cardid => {
    try {
      const transactionRequest = {
        transactionType: 'Payment',
        vendorName: 'sandbox',
        paymentMethod: {
          card: {
            merchantSessionKey: merchantSessionKey,
            cardIdentifier: cardid,
            reusable: false,
            save: true,
          },
        },
        vendorTxCode: newVendorTxCode,
        amount: 1000,
        currency: 'GBP',
        description: 'Create a Card Transaction (3D Secure required)',
        settlementReferenceText: 'ABC1234',
        customerFirstName: 'SpongeBob',
        customerLastName: 'SquarePants',
        billingAddress: {
          address1: 'address1',
          city: 'billingcity',
          country: 'GB',
          address2: 'addressline2',
          address3: 'addressline3',
          postalCode: 'PC1 8DE',
        },
        entryMethod: 'Ecommerce',
        giftAid: false,
        apply3DSecure: 'Disable',
        applyAvsCvcCheck: 'UseMSPSetting',
        customerEmail: 'email@example.com',
        customerPhone: '+44123456798',
        shippingDetails: {
          recipientFirstName: 'shippingFname',
          recipientLastName: 'shippingLName',
          shippingAddress1: 'shipaddress1',
          shippingCity: 'shipcity',
          shippingCountry: 'GB',
          shippingAddress2: 'shipaddress2',
          shippingAddress3: 'shipaddress3',
          shippingPostalCode: 'PC1 8DE',
        },
        referrerId: '99c84b48-dd6a-4ec8-9ed7-1d91afe4297b',
        strongCustomerAuthentication: {
          notificationURL: 'https://www.opayolabs.co.uk/OpayoDemo/pi_callback',
          browserIP: '158.175.142.169',
          browserAcceptHeader: 'text/html, application/json',
          browserJavascriptEnabled: true,
          browserUserAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0',
          challengeWindowSize: 'Small',
          transType: 'GoodsAndServicePurchase',
          browserLanguage: 'en-GB',
          browserJavaEnabled: true,
          browserColorDepth: '16',
          browserScreenHeight: '768',
          browserScreenWidth: '1200',
          browserTZ: '+300',
          acctID: 'Additional information',
          threeDSExemptionIndicator: 'LowValue',
          website: 'https://www.opayolabs.co.uk',
        },
        customerMobilePhone: '+4412345679',
        customerWorkPhone: '+4412345679',
        credentialType: {
          cofUsage: 'First',
          initiatedType: 'CIT',
          mitType: 'Unscheduled',
        },
      };
      // Encode the credentials for HTTP Basic Authentication
      const encodedCredentials = base64.encode(
        'hJYxsw7HLbj40cB8udES8CDRFLhuJ8G54O6rDpUXvE6hYDrria:o2iHSrFybYMZpmWOQMuhsXP52V4fBtpuSDshrKDSWsBY1OiN6hwd9Kb12z4j5Us5u',
      );
      const apiUrl = `https://sandbox.opayo.eu.elavon.com/api/v1/transactions`;
      const _response = await axios.post(apiUrl, transactionRequest, {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      console.log('Transactions Details', _response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('Server responded with status', error.response.status);
        console.log('Response data:', error.response.data);
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          width: 200,
          height: 50,
          backgroundColor: 'skyblue',
          borderRadius: 5,
        }}
        onPress={() => {
          getMerchantSessionKey();
        }}>
        <Text style={{color: 'black'}}>Test Merchant Key</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          width: 200,
          height: 50,
          backgroundColor: 'skyblue',
          borderRadius: 5,
          marginVertical: 10,
        }}
        onPress={() => {
          getCardIdentifiers();
        }}>
        <Text style={{color: 'black'}}>Test Card Identifiers</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: 'https://sandbox.opayo.eu.elavon.com/api/v1/js/sagepay.js',
          }}
          
        />
        <Text style={{color: 'black'}}>siddu</Text>
      </View>
    </View>
  );
};

export default TestPayment;

const styles = StyleSheet.create({});
