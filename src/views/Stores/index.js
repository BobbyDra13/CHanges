import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image, Dimensions, ActivityIndicator } from 'react-native';
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import Toast, { BaseToast } from 'react-native-toast-message';
import axios from 'axios';
import SwipeButton from 'rn-swipe-button';
import CircularProgress from 'react-native-circular-progress-indicator';
import thumbIcon from '../../../assets/swipe.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#06c58e', backgroundColor: "#06c58e" }}
      text1Style={{
        fontSize: 15,
        color:"#fff",
        fontFamily:"Lato-Bold",
        textAlign:"center"
      }}
    />
  ),
  info: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#E3AB12', backgroundColor: "#E3AB12" }}
        text1Style={{
          fontSize: 15,
          color:"#fff",
          fontFamily:"Lato-Bold",
          textAlign:"center"
        }}
      />
  )
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Shelves = ({ route, navigation }) => {

  const [partsDetails, setPartsDetails] = useState([]);
  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [flashMode, setFlashMode] = useState(false);
  const [imageURI, setImageURI] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [activeShelf, setActiveShelf] = useState(false);
  const [imageBytes, setImageBytes] = useState(false);
  const [displayImageUrl, setDisplayImageUrl] = useState();
  const [loadingModal, setLoadingModal] = useState(false);
  const [imagesArr, setImagesArr] = useState([]);
  const [currentUploadIndex, setCurrentUploadIndex] = useState(0);
  const [currentUploadPercentage, setCurrentUploadPercentage] = useState(0);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const setTabStyles = async () => {
      NavigationBar.setBackgroundColorAsync("#fff");
      NavigationBar.setButtonStyleAsync("dark");

      let user = await AsyncStorage.getItem('userData');
      let parsed = JSON.parse(user);
      if(parsed){
        setUserDetails(parsed)
      }
      else{
        //this.props.navigation.navigate("App Intro");
      }
    };
    console.log("BAY ID & SHELF ID ", route.params.bayID, route.params.shelfID)

    let status = Camera.requestCameraPermissionsAsync();
    setCameraPermission(status.status)
    setTabStyles();

    let dataArr = route.params.partsDetails
    const newArray = dataArr.map(obj => ({ ...obj, isPhotoClicked: false }));
    setPartsDetails(newArray);

  }, [navigation]);

  const takePhoto = async () => {
    setImageLoading(true)
		if(this.camera) {
			const options = {
				exif: true,
        skipProcessing: true
			};
			await this.camera.takePictureAsync(options).then( async(photo) => {
				/*let photoImage = await manipulateAsync(
					photo.localUri || photo.uri,
					[
						{
              rotate: 0 //-90
            }
					],
				);*/
        setCameraModal(false)
        setImageURI(photo.uri)
        setImageModal(true)
        convertImageToBytes(photo.uri);
			});
		}
	};
  const convertImageToBytes = async (uri) => {
    console.log("uri", uri);
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("blob", blob);
    const reader = new FileReader();
    let base64data;
    reader.onloadend = () => {
      base64data = reader.result;
      const splitUrl = base64data.split(",");
      setImageBytes(splitUrl[1]);
    };

    reader.readAsDataURL(blob);
    // return base64data
  };
  const retakeImage = async () => {
    setImageLoading(false)
    setImageModal(false)
    setCameraModal(true)
  }
  const pushImage = async () => {
    
    let images_array = imagesArr
    let dataEntry = {
      partsID: activeShelf,
      image: imageBytes,
    };
    images_array.push(dataEntry)
    setImagesArr(images_array)

    let dataArr = partsDetails
    const newArray = dataArr.map(obj => ({
      ...obj,
      isPhotoClicked: obj._id === activeShelf ? true : obj.isPhotoClicked
    }));
    setPartsDetails(newArray)
    setImageModal(false);
    setImageLoading(false);
  };
  const bulkImageUpload = async () => {
    setLoadingModal(true);
    for(let i=0; i<imagesArr.length; i++){
      let index = i+1
      let percentage = (index/imagesArr.length)*100
      setCurrentUploadIndex(i+1)
      setCurrentUploadPercentage(percentage)
      await uploadImage_new(imagesArr[i].image, imagesArr[i].partsID)
    }
    setLoadingModal(false);
    setImagesArr([])
  };

  const uploadImage = async () => {
    setImageModal(false);
    setImageLoading(false);
    //setLoadingModal(true);
    let userID = "658539cedca44464e229e098";
    let storeID = "6582be9ac5ed94d792a563b8";
    let brandID = route.params.brandID;
    let bayID = route.params.bayID;
    let shelfID = route.params.shelfID;
    let partsID = activeShelf;
    if (imageBytes && imageURI) {
      console.log("API CALL STart");
      let split_img = imageURI.split("ImageManipulator/");
      const final_image = `capture/test/${storeID}/${userID}/${brandID}/${bayID}/${shelfID}/${partsID}/${split_img[1]}`;
      console.log(final_image)
      const final_dict = {
        image_s3_prefix: final_image,
        image: imageBytes,
      };
      console.log(final_dict)
      await axios
        .post(
          "https://zmobboqvn8.execute-api.ap-south-1.amazonaws.com/test/upload_img",
          final_dict
        )
        .then((response) => {
          setLoadingModal(false);
          //console.log("response", typeof response.data.body);
          const image_data = JSON.parse(response.data.body);
          console.log("response", response.data.body);
          // console.log("img url", image_data.plotted_img_ps_url)
          setDisplayImageUrl(image_data.plotted_img_ps_url);
          setImageLoading(false);
          setImageModal(false);
          setImageSubmitted(true);
          setImageBytes(false);
          Toast.show({
              type: 'success',
              text1: 'Image Uploaded Successfully'
          });
        })
        .catch((error) => {
          setLoadingModal(false);
          Toast.show({
            type: 'info',
            text1: 'Failed to upload image'
          });
          console.log(error);
        });
    }
  };
  const uploadImage_new = async (image, partsID) => {
    setImageModal(false);
    setImageLoading(false);
    //setLoadingModal(true);
    //let userID = "658539cedca44464e229e098";
    //let storeID = "6582be9ac5ed94d792a563b8";
    let userID = userDetails._id;
    let storeID = userDetails.stores[0];
    let brandID = route.params.brandID;
    let bayID = route.params.bayID;
    let shelfID = route.params.shelfID;
    if (image && partsID) {
      console.log("API CALL STart");
      let split_img = imageURI.split("ImageManipulator/");
      const final_image = `capture/test/${storeID}/${userID}/${brandID}/${bayID}/${shelfID}/${partsID}/${split_img[1]}`;
      console.log(final_image)
      const final_dict = {
        image_s3_prefix: final_image,
        image: image,
      };
      console.log(final_dict)
      await axios
        .post(
          "https://zmobboqvn8.execute-api.ap-south-1.amazonaws.com/test/upload_img",
          final_dict
        )
        .then((response) => {
          console.log("response", response.data.body);
          Toast.show({
              type: 'success',
              text1: 'Image Uploaded Successfully'
          });
        })
        .catch((error) => {
          Toast.show({
            type: 'info',
            text1: 'Failed to upload image'
          });
          console.log(error);
        });
    }
  };
  const openCamera = async (id) => {
    setCameraModal(true)
    setActiveShelf(id)
  }
  const groupedData = [];
  for (let i = 0; i < partsDetails.length; i += 2) {
    groupedData.push(partsDetails.slice(i, i + 2));
  }
  const BoxComponent = ({ data, index }) => (
    <>
    {
      index == 0 ?
      <ImageBackground
        source={require("../../../assets/left_cupboard.png")}
        style={{ flex: 1, resizeMode: 'contain', width: 133, height: 400 }}
      >
        {data.map(item => (
          <>
          {
            item.isPhotoClicked ?
            <Image source={require("../../../assets/check.png")} style={{height: 45, width:45, marginTop: 127, alignItems:"center", marginBottom: 12, alignSelf:"center", justifyContent:"center", marginLeft: 10}} resizeMode="contain"/>
            :
            <TouchableOpacity onPress={()=>openCamera(item._id)}>
              <Image source={require("../../../assets/red-dot.gif")} style={{height: 60, width:60, alignItems:"center", alignSelf:"center", justifyContent:"center", marginTop: 117, marginBottom: 10, marginLeft: 10}} resizeMode="contain"/>
            </TouchableOpacity>
          }
          </>
        ))}
      </ImageBackground>
      :
      <>
        {
          index == (partsDetails.length/2)-1 ?
          <ImageBackground
            source={require("../../../assets/right_cupboard.png")}
            style={{ flex: 1, resizeMode: 'contain', width: 133, height: 400,  marginRight: 42 }}
          >
            {data.map(item => (
              <>
                {
                  item.isPhotoClicked ?
                    <Image source={require("../../../assets/check.png")} style={{height: 45, width:45, marginTop: 127, alignItems:"center", alignSelf:"center", justifyContent:"center", marginBottom: 7, marginRight: 12}} resizeMode="contain"/>
                  :
                    <TouchableOpacity onPress={()=>openCamera(item._id)}>
                      <Image source={require("../../../assets/red-dot.gif")} style={{height: 60, width:60, alignItems:"center", alignSelf:"center", justifyContent:"center", marginTop: 117, marginBottom: 10, marginRight: 10}} resizeMode="contain"/>
                    </TouchableOpacity>
                }
              </>
            ))}
          </ImageBackground>
          :
          <ImageBackground
            source={require("../../../assets/center_cupboard.png")}
            style={{ flex: 1, resizeMode: 'contain', width: 120, height: 401.5 }}
          >
            {data.map(item => (
              <>
                {
                  item.isPhotoClicked ?
                    <Image source={require("../../../assets/check.png")} style={{height: 45, width:45, marginTop: 127, alignItems:"center", alignSelf:"center", justifyContent:"center", marginBottom: 12}} resizeMode="contain"/>
                  :
                    <TouchableOpacity onPress={()=>openCamera(item._id)}>
                      <Image source={require("../../../assets/red-dot.gif")} style={{height: 60, width:60, alignItems:"center", alignSelf:"center", justifyContent:"center", marginTop: 117, marginBottom: 10}} resizeMode="contain"/>
                    </TouchableOpacity>
                }
              </>
            ))}
          </ImageBackground>
        }
      </>
    }
    </>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} style="dark" />
      <Modal style={{ flex: 1, height: windowHeight, width: windowWidth, backgroundColor:"#1a1a1a"}} backdropOpacity={0.9} isVisible={cameraModal} useNativeDriver={true}>
        <StatusBar backgroundColor={"#1a1a1a"} style="light" />
        <Camera
          focusDepth={1}
          ratio={"16:9"}
          style={{height: windowHeight, width: windowWidth, flex: 1, marginLeft: -20, marginBottom: -20}}
          ref={(ref) => { this.camera = ref }}
          flashMode={flashMode ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
          autoFocus={Camera.Constants.AutoFocus.on}
        >
          <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0)"}}>
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                alignSelf: "stretch",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              }}
            >
              <View style={{ margin: 10, marginTop: 0 }}>
                <AntDesign name="close"
                  onPress={() => setCameraModal(false)}
                  size={32}
                  color="#fff"
                />
              </View>
            </View>
          </View>
          {
            imageLoading ? 
              <View style={{ marginBottom: "10%" }}>
                <View style={{backgroundColor:"#0891b2", flexDirection:"row", borderRadius: 10, padding:"3%", paddingLeft: 15, paddingRight: 15, width: 205, marginLeft:"25%"}}>
                  <Text style={{color:"#fff", textAlign:"center", fontSize: 17, fontWeight:"bold", marginRight: 15}}>Processing Image</Text>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              </View>
            :
              <></>
          }
          <View
            style={{
              justifyContent: "space-around",
              paddingTop:10,
              paddingBottom:10,
              flexDirection: "row",
              alignitems: "center",
              backgroundColor: "rgba(52, 52, 52, 0.6)",
            }}
          >
            <TouchableOpacity onPress={() => setFlashMode(!flashMode)}>
              <FontAwesome name="flash"
                size={40}
                style={{paddingTop:"2%"}}
                color={flashMode ? "#0891b2" : "#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto}>
              <MaterialIcons name="camera"
                size={60}
                color={"#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="center-focus-weak"
                size={40}
                style={{paddingTop:"2%"}}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
      <Modal style={{ flex: 1, height: windowHeight, width: windowWidth, backgroundColor:"#1a1a1a"}} backdropOpacity={0.9} isVisible={imageModal} useNativeDriver={true}>
        <StatusBar backgroundColor={"#1a1a1a"} style="light" />
        <View style={{backgroundColor:"#fff", minHeight: 300, width:"90%", borderRadius: 10, padding: 10}}>
          <Image
            source={{ uri: imageURI }}
            resizeMode="cover"
            style={{height: 500, width:"100%", borderRadius: 10}}
          />
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
          <TouchableOpacity
            onPress={retakeImage}
            style={{
              borderRadius: 12,
              height: 53,
              backgroundColor: "#fff",
              borderColor: "#0891b2",
              borderWidth: 1.1,
              width: "47%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Lato-Bold",
                color: "#0891b2",
                fontSize: 18,
                marginBottom: 2,
              }}
            >
              Retake
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pushImage}
            style={{
              borderRadius: 12,
              height: 53,
              backgroundColor: "#0891b2",
              width: "47%",
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#0891b2",
              borderWidth: 1.1,
            }}
          >
            <Text
              style={{
                fontFamily: "Lato-Bold",
                color: "#fff",
                fontSize: 18,
                marginBottom: 2,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.9}
        isVisible={loadingModal}
        style={{ justifyContent: "center", alignSelf: "center" }}
        useNativeDriver={true}
      >
        <StatusBar backgroundColor={"#1a1a1a"} style="light" />
        <View
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <CircularProgress
            value={currentUploadPercentage}
            inActiveStrokeColor={'#fff'}
            radius={70}
            duration={1000}
            progressValueColor={'#ecf0f1'}
            maxValue={100}
            valueSuffix={'%'}
            titleColor={'white'}
            titleStyle={{fontWeight: 'bold'}}
          />
          <Text style={{textAlign:"center", fontFamily: "Lato-Bold", color:"#fff", fontSize: 20, marginTop: 20, lineHeight: 35}}>Uploading {currentUploadIndex} / {imagesArr.length} Photos</Text>
        </View>
      </Modal>
      <ScrollView style={{paddingTop:"2%", marginBottom: 0}} showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: "Lato-Bold", fontSize: 26, marginLeft:"6%", marginBottom:"5%"}}>Shelves</Text>
        <ScrollView horizontal={true} style={{paddingLeft:"6%"}} contentContainerStyle={{marginLeft: groupedData && groupedData.length> 2 ? 0 : "7.5%"}} showsHorizontalScrollIndicator={false}>
          {
            groupedData.map((group, index) => (
              <BoxComponent key={index} data={group} index={index} />
            ))
          }
        </ScrollView>
        <SwipeButton
          containerStyles={{borderRadius: 45/2, marginLeft:"6%", marginRight: "6%", marginTop: "10%", marginBottom:"6%" }}
          height={47}
          onSwipeSuccess={bulkImageUpload}
          shouldResetAfterSuccess={true}
          resetAfterSuccessAnimDelay={2000}
          railBackgroundColor="#fff"
          railBorderColor="#0891b2"
          railFillBackgroundColor='#0891b2'
          railFillBorderColor='#0891b2'
          disabled={imagesArr.length>0 ? false : true}
          disabledRailBackgroundColor={"#fff"}
          disabledThumbIconBackgroundColor={"#fff"}
          disabledThumbIconBorderColor={"#fff"}
          railStyles={{borderRadius: 50}}
          thumbIconBorderColor="#0891b2"
          thumbIconImageSource={thumbIcon}
          thumbIconBackgroundColor="#fff"
          thumbIconStyles={{borderRadius:50,}}
          thumbIconWidth={50} 
          title="Swipe to upload images"
          titleColor="#0891b2"
          titleStyles={{
            fontSize:16, fontWeight:"bold"
          }}
        />
        <Toast position="top" visibilityTime={2000} config={toastConfig}/>
        <TouchableWithoutFeedback onPress={() => this.RBSheet.open()}>
          <View style={{backgroundColor:"#0891b2", flex: 1, width:"100%", height: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop:"5%"}}>
            <View style={{flexDirection:"row", padding: 20}}>
              <MaterialIcons name="storefront" size={30} color="#FFF" style={{backgroundColor:"#111921", padding: 10, borderRadius: 100, marginRight: 15}}/>
              <View>
                <Text style={{fontFamily: "Lato-Bold", fontSize: 20, color:"#fff"}}>Uploaded Images</Text>
                <Text style={{fontFamily: "Lato-Bold", fontSize: 16, color:"#fff", marginTop: 3, opacity: 0.7}}>Clovia - Bay #1</Text>
              </View>
            </View>
            <View style={{backgroundColor:"#fff", width:"100%", borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
              <View style={{ justifyContent:"space-between", flexDirection:"row", alignItems:"center", paddingTop: "7%", paddingLeft:"5%", paddingRight:"5%"}}>
                <View style={{width:"47%"}}>
                  {
                    imageSubmitted ?
                    <>
                      <Image source={{ uri: imageURI }} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="cover"/>
                      <Image source={require("../../../assets/clock.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                    </>
                    :
                    <>
                      <Image source={require("../../../assets/shelf_1.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                      <Image source={require("../../../assets/clock.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                    </>
                  }
                </View>
                <View style={{width:"47%"}}>
                  <>
                    <Image source={require("../../../assets/shelf_2.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                    <Image source={require("../../../assets/cancel.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                  </>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <RBSheet
          ref={ref => {
              this.RBSheet = ref;
          }}
          height={500}
          openDuration={500}
          animationType={"fade"}
          dragFromTopOnly={true}
          closeOnDragDown={true}
          customStyles={{
              container: {
                backgroundColor:"#0891b2",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }
          }}
        >
          <StatusBar backgroundColor={"#888888"} style="dark" />
          <View style={{backgroundColor:"#0891b2", flex: 1, width:"100%", height: "100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: -10}}>
            <View style={{flexDirection:"row", padding: 20}}>
              <MaterialIcons name="storefront" size={30} color="#FFF" style={{backgroundColor:"#111921", padding: 10, borderRadius: 100, marginRight: 15}}/>
              <View>
                <Text style={{fontFamily: "Lato-Bold", fontSize: 20, color:"#fff"}}>Uploaded Images</Text>
                <Text style={{fontFamily: "Lato-Bold", fontSize: 16, color:"#fff", marginTop: 3, opacity: 0.7}}>Clovia - Bay #1</Text>
              </View>
            </View>
            <View style={{backgroundColor:"#fff", width:"100%", borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent:"space-between", flexDirection:"row", alignItems:"center", paddingTop: "7%", paddingLeft:"5%", paddingRight:"5%"}}>
                  <View style={{width:"47%"}}>
                    {
                      imageSubmitted ?
                      <>
                        <Image source={{ uri: imageURI }} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="cover"/>
                        <Image source={require("../../../assets/clock.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                      </>
                      :
                      <>
                        <Image source={require("../../../assets/shelf_1.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                        <Image source={require("../../../assets/clock.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                      </>
                    }
                  </View>
                  <View style={{width:"47%"}}>
                    <>
                      <Image source={require("../../../assets/shelf_2.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                      <Image source={require("../../../assets/cancel.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                    </>
                  </View>
                </View>
                <View style={{backgroundColor:"#fff", width:"100%", borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                  <View style={{ justifyContent:"space-between", flexDirection:"row", alignItems:"center", paddingTop: "7%", paddingLeft:"5%", paddingRight:"5%"}}>
                    <View style={{width:"47%"}}>
                      <>
                        <Image source={require("../../../assets/shelf_1.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                        <Image source={require("../../../assets/clock.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                      </>
                    </View>
                    <View style={{width:"47%"}}>
                      <>
                        <Image source={require("../../../assets/shelf_2.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                        <Image source={require("../../../assets/cancel.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                      </>
                    </View>
                  </View>
                </View>
                <View style={{backgroundColor:"#fff", width:"100%", borderTopLeftRadius: 25, borderTopRightRadius: 25, marginBottom:"30%"}}>
                  <View style={{ justifyContent:"space-between", flexDirection:"row", alignItems:"center", paddingTop: "7%", paddingLeft:"5%", paddingRight:"5%"}}>
                    <View style={{width:"47%"}}>
                      <>
                        <Image source={require("../../../assets/shelf_1.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                        <Image source={require("../../../assets/clock.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                      </>
                    </View>
                    <View style={{width:"47%"}}>
                      <>
                        <Image source={require("../../../assets/shelf_2.jpg")} style={{height: 170, width:"100%", borderRadius: 10}} resizeMode="contain"/>
                        <Image source={require("../../../assets/cancel.png")} style={{height: 35, width:35, position:"absolute", marginTop: "63%", marginLeft:"70%"}} resizeMode="contain"/>
                      </>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </RBSheet>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  floor_container: {
    marginTop: 10,
    marginBottom: "5%",
    paddingLeft:"6%", paddingRight:"6%"
  },
  floor_container_2D: {
    marginTop: -10,
    marginBottom: "5%",
  },
  room_3D: {
    marginTop: -40,
    height: 295,
    width: 250,
    marginLeft: 55, marginRight: 100,
    borderWidth: 2,
    borderColor:"#0891b2",
    borderBottomWidth: 0,
    transform: [{ perspective: 300 }, { rotateX: '45deg' }]
  },
  room_2D: {
    height: 295,
    marginTop: 50,
    width: 250,
    marginRight: 1,
    borderWidth: 2,
    borderColor:"#0891b2",
    borderBottomWidth: 0,
  },
  door: {
    width: 20,
    height: 40,
  },
  left_shelf: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor:"#0891b2",
    borderTopLeftRadius: 10, // Adjust this value for the top-left corner
    borderBottomRightRadius: 10,
    marginTop: 40,
    marginLeft: -13,
    marginBottom: 20,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    transform: [{ rotate: '-90deg' }],
  },
  center_shelf: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor:"#0891b2",
    marginTop: 10,
    borderTopLeftRadius: 10, // Adjust this value for the top-left corner
    borderBottomRightRadius: 10,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
  },
  right_shelf: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor:"#0891b2",
    borderTopLeftRadius: 10, // Adjust this value for the top-left corner
    borderBottomRightRadius: 10,
    marginTop: 40,
    marginRight: -13,
    marginBottom: 20,
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    transform: [{ rotate: '90deg' }],
  },
  shelf_text: {
    fontSize: 15,
    fontFamily:"Lato-Regular"
  },
  activeShelf: {
    backgroundColor: '#44bd54',
    borderWidth: 2,
    borderColor:"#44bd54",
  },
  activeShelfText: {
    color: "#fff"
  },

  first_shelf_marker:{
    position: 'absolute', marginTop: "30%", marginLeft: "23%"
  },
  fifth_shelf_marker:{
    position: 'absolute', marginTop: "10%", marginLeft: "70%"
  }
});

export default Shelves;