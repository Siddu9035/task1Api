import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const Postal = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [postOfficeData, setPostOfficeData] = useState([]);
  const [pincode, setPincode] = useState('');
  const [selectedPostOffice, setSelectedPostOffice] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (!pincode) {
      setPincodeError('Please enter pincode');
      return;
    }
    setIsLoading(true);
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(res => {
        setIsLoading(false);
        const data = res.data[0];
        if (data.Status === 'Success') {
          setPostOfficeData(data.PostOffice);
          setPincodeError('');
          setSelectedPostOffice(data.PostOffice[0]); // Set the selected post office
        } else if (data.Status === 'Error') {
          setPostOfficeData([]);
          setSelectedPostOffice('');
          setPincodeError(res.data[0].Message);
        } else {
          console.log('fetched', res.data);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };
  const dissmissKeyBoard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.container} onPress={dissmissKeyBoard}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.pincodeText}>PinCode :</Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="Enter Pin Code"
            placeholderTextColor={'black'}
            style={styles.pincode}
            onChangeText={text => setPincode(text)}
            onBlur={() => {
              fetchData();
            }}
            onPressIn={() => {
              setPincodeError('');
            }}
            value={pincode}
            maxLength={6}
            keyboardType="number-pad"
          />
          {pincodeError !== '' && (
            <Text style={{color: 'red', fontSize: 15}}>{pincodeError}</Text>
          )}
        </View>
        <Text style={styles.pincodeText}>Post Office :</Text>
        <View style={styles.dropDownContainer}>
          <TouchableOpacity
            style={styles.postoffice}
            disabled={postOfficeData.length === 0}
            onPress={() => {
              setIsClicked(!isClicked);
            }}>
            <Text style={{color: 'black'}}>{selectedPostOffice?.Name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownSelector}
            disabled={postOfficeData.length === 0}  
            onPress={() => {
              setIsClicked(!isClicked);
            }}>
            <Icon
              name={isClicked ? 'angle-up' : 'angle-down'}
              size={30}
              color="green"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <View>
          {isClicked && (
            <ScrollView style={styles.dropdownArea}>
              {postOfficeData.map((office, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.inputField,
                      selectedPostOffice.Name == office.Name &&
                        styles.selectedInput,
                    ]}
                    onPress={() => {
                      setSelectedPostOffice(office);
                      setIsClicked(!isClicked);
                    }}>
                    <Text key={index} style={{color: 'black', padding: 6}}>
                      {office.Name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={{alignSelf: 'center', width: '90%'}}>
          <Text style={styles.talukText}>Taluk :</Text>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.taluk}
            value={postOfficeData[0]?.Block}
            editable={false}
          />
        </View>
        <Text style={styles.districttext}>District :</Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.district}
            value={postOfficeData[0]?.District}
            editable={false}
          />
        </View>
        <Text style={styles.statetext}>State :</Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholderTextColor={'black'}
            style={styles.state}
            value={postOfficeData[0]?.State}
            editable={false}
          />
        </View>
      </View>
      {isLoading && (
        <View style={styles.Loader}>
          <ActivityIndicator size="large" color="#4682B4"></ActivityIndicator>
          <Text style={{color: 'black'}}>Please Wait.....</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Postal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FFFA',
  },
  pincodeText: {
    color: 'black',
    marginLeft: 17,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  talukText: {
    color: 'black',
    marginBottom: 5,
    fontSize: 16,
  },
  districttext: {
    color: 'black',
    marginLeft: 17,
    marginBottom: 5,
    fontSize: 16,
  },
  statetext: {
    color: 'black',
    marginLeft: 17,
    marginBottom: 5,
    fontSize: 16,
  },
  pincode: {
    width: Dimensions.get('window').width - 40,
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#FFFFE0',
  },
  postoffice: {
    width: '70%',
    height: 40,
    marginTop: 5,
    borderRadius: 15,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: '#FFFFE0',
  },
  dropdownArea: {
    width: Dimensions.get('window').width - 40,
    height: 120,
    marginBottom: 5,
    borderWidth: 1,
    marginLeft: 18,
    borderRadius: 6,
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#FFFFE0',
  },
  dropdownSelector: {
    height: 40,
    justifyContent: 'center',
    width: 80,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 15,
  },
  iconStyle: {
    marginLeft: 20,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 15,
    width: Dimensions.get('window').width - 40,
    borderWidth: 1,
    height: 50,
    marginBottom: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#FFFFE0',
  },
  taluk: {
    width: Dimensions.get('window').width - 40,
    marginRight: 10,
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#FFFFE0',
  },
  district: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#FFFFE0',
  },
  state: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#FFFFE0',
  },
  selectedInput: {
    backgroundColor: '#BC8F8F',
    color: 'white',
    borderRadius: 6,
  },
  Loader: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
