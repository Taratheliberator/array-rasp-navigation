import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  //SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';

//import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

import { NameContext } from './NameContext';

const DetailsScreen = () => {
  const [data, setData] = useState([]);
  const { facultyName, setFacultyName } = useContext(NameContext);
  const { groupName, setGroupName } = useContext(NameContext);
  async function ReadingFromServer(facultyName, groupName) {
    try {
      const response = await fetch(
        // `https://api.npoint.io/91d8eee016b7f9690aea`,
        `http://172.16.3.106/asr/hs/RaspTest/GetR/${facultyName}/${groupName}`, // внутренний ресурс из 1C
        //  `https://api.npoint.io/dfc872b5d1fb4b13c7ff`, // зеркало 1 С для ВМК и 905 группы
        //`https://api.npoint.io/218b6ec0a50b47163f2b`, // реальное расписание матфак
        //`https://api.npoint.io/8bda658027c291dfb765`, //реальное расписание 13.12.2022
        //`https://api.npoint.io/957c6a8b27c9b920180e`, // с чет нечет
        //`https://api.npoint.io/2b89543b4941b53580ee`, //с чет нечет с null в subjectName

        {
          method: 'get',
          headers: new Headers({
            Authorization: 'Basic ' + '0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6MTIzMzIxMTAy', // логин Администратор, пароля нет. Использовал сайт https://www.base64decode.org/
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        },
      );

      const rasp = await response.json();
      setData(rasp);
      //console.log(facultyName, groupName);
      // console.log('data', data);
      //console.log(facultyName, groupName);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    ReadingFromServer(facultyName, groupName);
  }, []);

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View style={styles.dropdownsRow}>
        <ScrollView>
          <View>
            {data &&
              data.map((record) => {
                return (
                  <View key={data.id} style={styles.container_group}>
                    <View style={styles.container_lesson_dayweek}>
                      <Text style={styles.text_day}> {record.name} </Text>
                    </View>

                    {record &&
                      record.lesson.map((data2) => {
                        return (
                          <View key={record.id} style={styles.container_para_and_subject}>
                            <View style={styles.container_lesson}>
                              <View style={styles.container_lesson_para}>
                                <Text style={styles.text1}>{data2.name}</Text>
                              </View>

                              <View style={styles.container_lesson_time}>
                                <Text style={styles.text2}>{data2.time}</Text>
                              </View>
                            </View>

                            {data2 &&
                              data2.subject.map((data3) => {
                                return (
                                  <View key={data3.chet_id} style={styles.container_subject_0}>
                                    <Text style={styles.text2}>{data3.chetName}</Text>
                                    <View style={styles.container_subject1}>
                                      <Text style={styles.text2}>{data3.subjectName}</Text>
                                      {data3.subjectName == null ? (
                                        <Text style={styles.text2}>{'\n'}</Text>
                                      ) : (
                                        <View>
                                          {data3 &&
                                            data3.massiv.map((data4) => {
                                              return (
                                                <View
                                                  key={data3.id}
                                                  style={styles.container_subject2}>
                                                  <View
                                                    style={styles.container_subject_massiv_teacher}>
                                                    {data4.teacherName !== '' && (
                                                      <Text style={styles.text2}>
                                                        {data4.teacherName}
                                                      </Text>
                                                    )}
                                                  </View>
                                                  <View
                                                    style={styles.container_subject_massiv_group}>
                                                    {data4.groupName !== '' && (
                                                      <Text style={styles.text2}>
                                                        {' '}
                                                        {data4.groupName}
                                                      </Text>
                                                    )}
                                                  </View>
                                                  {data4 &&
                                                    data4.location.map((data5) => {
                                                      return (
                                                        <View
                                                          key={data4.id}
                                                          style={
                                                            styles.container_subject_massiv_location
                                                          }>
                                                          <View>
                                                            <Text style={styles.text2}>
                                                              {data5.locationName}
                                                            </Text>
                                                          </View>
                                                        </View>
                                                      );
                                                    })}
                                                </View>
                                              );
                                            })}
                                        </View>
                                      )}
                                    </View>
                                  </View>
                                );
                              })}
                          </View>
                        );
                      })}
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default DetailsScreen;

const styles = StyleSheet.create({
  saveAreaViewContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    // alignContent: 'center',
    //  justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    //  alignContent: 'center',
    //padding: 20,
  },
  //scrollViewContainer: {
  //   flexGrow: 1,
  // justifyContent: 'space-between',
  //alignItems: 'center',
  // paddingVertical: '10%',
  //},
  dropdownsRow: { flexDirection: 'column', width: '100%', paddingHorizontal: '5%', height: 120 },

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
    //padding: 10
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  divider: { width: 50 },
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 10,
  },
  dropdown2BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown2DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown2RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: { color: '#444', textAlign: 'left' },

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
    // paddingHorizontal: '5%',

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
    // backgroundColor: '#6fdc6f',
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
    // backgroundColor: '#EFEFEF',
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
    // backgroundColor: '#D7A4A9',
    flex: 0.5,
    flexDirection: 'column',
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
    // backgroundColor: '#c9f6a6',
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
    // backgroundColor: '#c9f6a6',
    flex: 0.5,
    //padding: 3,
    //borderColor: '#c9f6a6',
    //borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
    // borderRadius: 2,
  },
  container_subject_massiv_group: {
    flexDirection: 'row',
    // backgroundColor: '#c9f6a6',
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
  container_subject_massiv_location: {
    flexDirection: 'row',
    // backgroundColor: '#c9f6a6',
    flex: 1,
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
