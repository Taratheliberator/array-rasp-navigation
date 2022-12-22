import React, { useEffect, useState, useRef, useContext } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NameContext } from './NameContext';
import { Dropdown } from 'react-native-element-dropdown';

const HomeScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);

  const [json, setJson] = useState({});
  const [facultyCode, setFacultyCode] = useState(null);
  const [facultyData, setFacultyData] = useState([]);
  const [groupData, setGroupData] = useState([]);

  const [data, setData] = useState([]);

  const [faculty, setFaculty] = useState(null);
  const [group, setGroup] = useState(null);

  const { facultyName, setFacultyName } = useContext(NameContext);
  const { groupName, setGroupName } = useContext(NameContext);

  const [isFocus, setIsFocus] = useState(false);

  async function GetJson() {
    try {
      //const response = await fetch('https://api.npoint.io/6427fcf1215c1f9d7cd1'); самая первая версия
      //const response = await fetch('https://api.npoint.io/15ba2e3bf427d39e677b'); //Артур 4 версия
      //const response = await fetch('https://api.npoint.io/a2d6656d11086e4ae2fb'); //getFacult_Артур с внешнего ресурса
      //const response = await fetch('http://172.16.3.106/asr_demo/hs/test/getFacult'); //getFacult_Артур с внутреннего
      //const response = await fetch(`https://api.npoint.io/a2d6656d11086e4ae2fb`, {`http://172.16.3.106/asr/hs/RaspTest/GetFacult`, //13.12.2022 самое свежее факультеты и группы
      const response = await fetch(
        `http://172.16.3.106/asr/hs/RaspTest/GetFacult`, //13.12.2022 самое свежее факультеты и группы
        {
          method: 'get',
          headers: new Headers({
            Authorization: 'Basic ' + '0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6MTIzMzIxMTAy', // логин Администратор, пароля нет. Использовал сайт https://www.base64decode.org/
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        },
      );
      const json = await response.json();
      setJson(json);
      // console.log(json);
      var count = json.length; // находит количество факультетов, в индийской версии было Object.keys(json.faculty).length
      console.log(count);
      let facultyArray = [];
      for (var i = 0; i < count; i++) {
        facultyArray.push({
          value: json[i].id,
          label: json[i].name,
        });
      }

      setFacultyData(facultyArray);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetJson();
  }, []);

  async function GetJsonGroup(facultyCode) {
    try {
      var count = json[facultyCode].group.length; //находит количество групп (длина массива), в индийской версии было Object.keys(json.faculty[facultyCode].group).length

      let groupArray = [];
      for (var i = 0; i < count; i++) {
        groupArray.push({
          value: json[facultyCode].group[i].id,
          label: json[facultyCode].group[i].name,
        });
      }

      setGroupData(groupArray);
    } catch (error) {
      console.error(error);
    }
  }
  const handleGroup = (facultyCode) => {
    GetJsonGroup(facultyCode);
  };

  const handleRasp = (facultyName, groupName) => {
    navigation.navigate('Расписание занятий');

    console.log('facultyName', facultyName, 'groupName', groupName, 'Raspisanie', data);
  };

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: '#F8F8F8', padding: 20, borderRadius: 15 }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={facultyData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Выберете факультет' : '...'}
          searchPlaceholder="Поиск..."
          value={faculty}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setFaculty(item.value);
            handleGroup(item.value);
            setFacultyName(item.label);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown2, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle2}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={groupData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Выберете группу' : '...'}
          searchPlaceholder="Поиск..."
          value={group}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setGroup(item.value);
            //handleCity(faculty, item.value);

            setGroupName(item.label);
            // handleRasp(facultyName, item.label);
            console.log(facultyName, item.label);
            setIsFocus(false);
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#0F3460',
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
          }}
          onPress={() => {
            handleRasp(facultyName, groupName);

            console.log(facultyName, groupName); //handleCity();
          }}>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '400',
            }}>
            Подтвердить
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ecf0f2',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 47,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  dropdown2: {
    height: 47,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    height: 40,

    fontSize: 16,
  },
  selectedTextStyle2: {
    height: 40,
    marginTop: 15,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ecf0f2',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: '',
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#cc33ff',
    font: '#19191B',
  },
  paragraph2: {
    fontSize: 16,
    fontWeight: '',
    textAlign: 'center',
    padding: 5,
  },
  text1: {
    fontSize: 16,
    textAlign: 'center',
    //color: '#32CD32',
    backgroundColor: '#32CD32',
  },
  text2: {
    fontSize: 16,
    textAlign: 'center',
    //color: '#32CD32',
  },
  text_day: {
    // marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    //color: '#32CD32',
    //backgroundColor: '#32CD32',
    // marginBottom: 10,
  },
  text1: {
    // marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    //color: '#32CD32',
    //backgroundColor: '#32CD32',
    // marginBottom: 10,
  },
  text2: {
    fontSize: 16,
    textAlign: 'center',
    //color: '#32CD32',
  },
  container_group: {
    //backgroundColor: '#FFF',
    flexDirection: 'column',
    //paddingHorizontal: '5%',

    width: '100%',
    //padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#eeeeee',
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
    //marginBottom: '5%',
  },
  container_lesson_dayweek: {
    //backgroundColor: '#b76cf1',
    flexDirection: 'row',
    // height: 100,
    width: '100%',
    //  padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
  },
  container_lesson: {
    //backgroundColor: '#6fdc6f',
    flexDirection: 'row',
    // height: 100,
    width: '100%',
    //  padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
  },
  container_para_and_subject: {
    marginTop: 5,
    //backgroundColor: '#EFEFEF',
    flexDirection: 'column',
    // height: 100,
    width: '100%',
    //  padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    // justifyContent: '',
    // alignContent: '',
    //backgroundColor: '#FFD300',
    borderColor: '#FFD300',
    borderWidth: 1,
    borderRadius: 8,
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
    marginBottom: 5,
  },
  container_lesson_para: {
    //backgroundColor: '#D7A4A9',
    flexDirection: 'row',
    flex: 0.5,
    height: 30,
    width: '100%',
    //padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
    //borderColor: '#FFD300',
    //borderWidth: 1,
    //borderRadius: 8,
  },
  container_lesson_time: {
    //backgroundColor: '#D7A4A9',
    flex: 0.5,
    flexDirection: 'row',
    height: 30,
    width: '100%',
    // padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
    // borderColor: '#FFD300',
    // borderWidth: 1,
    // borderRadius: 8,
  },
  container_subject_0: {
    // marginTop: 10,
    //backgroundColor: '#a6f16cC',
    flexDirection: 'column',
    //height: 50,
    width: '100%',
    //padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    //marginBottom: 10,
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
    borderColor: '#c9f6a6',
    // justifyContent: '',
    // alignContent: '',
    //backgroundColor: '#FFD300',
    borderWidth: 1,
    borderRadius: 8,
    // marginBottom: 10,
  },
  container_subject1: {
    //marginTop: 10,
    //backgroundColor: '#A6F16C',
    flexDirection: 'column',
    //height: 50,
    width: '100%',
    //padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    //marginBottom: 10,
    //backgroundColor: '#FFD300',
    // borderRadius: 2,
    //borderColor: '#FFD300',
    // justifyContent: '',
    // alignContent: '',
    //backgroundColor: '#FFD300',
    //borderWidth: 1,
    // borderRadius: 8,
  },
  container_subject2: {
    //backgroundColor: '#c9f6a6',
    flexDirection: 'column',
    //height: 60,
    width: '100%',
    padding: 3,

    // justifyContent: '',
    // alignContent: '',
    //backgroundColor: '#FFD300',
    //borderColor: '#c9f6a6',
    // borderWidth: 1,
    //borderRadius: 8,
    // marginBottom: 10,
  },
  container_subject_massiv_teacher: {
    flexDirection: 'row',
    //backgroundColor: '#c9f6a6',
    flex: 0.5,
    //padding: 3,
    //borderColor: '#c9f6a6',
    //borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    // borderRadius: 2,
  },
  container_subject_massiv_location: {
    flexDirection: 'row',
    //backgroundColor: '#c9f6a6',
    flex: 0.5,
    width: '100%',
    //padding: 3,
    // borderColor: '#c9f6a6',
    //  borderWidth: 1,
    // borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    // borderRadius: 2,
  },
});
