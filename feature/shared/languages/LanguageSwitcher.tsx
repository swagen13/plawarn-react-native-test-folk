import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Box, Button, Center, Heading, HStack, Text } from 'native-base';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SharedFontAwesome from '../SharedFontAwesome';

interface ILangOption {
  label: string;
  code: string;
  value: string;
  image: any;
}

function SharedLanguageSwitcher() {
  // initialize i18n hook
  const { t, i18n } = useTranslation();

  // initialize bottom sheet ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // initialize bottom sheet snap point index
  const snapPoints = useMemo(() => {
    return ['40%', '60%'];
  }, []);

  // initialize language options
  const [languageList] = useState<ILangOption[]>([
    {
      label: 'ไทย',
      code: 'th',
      value: '+66',
      image: require('../../../assets/images/flags/th.png'),
    },
    {
      label: 'ลาว',
      code: 'la',
      value: '+856',
      image: require('../../../assets/images/flags/la.png'),
    },
    {
      label: 'พม่า',
      code: 'mm',
      value: '+95',
      image: require('../../../assets/images/flags/mm.png'),
    },
    {
      label: 'กัมพูชา',
      code: 'kh',
      value: '+855',
      image: require('../../../assets/images/flags/kh.png'),
    },
    {
      label: 'เวียดนาม',
      code: 'vn',
      value: '+84',
      image: require('../../../assets/images/flags/vn.png'),
    },
    {
      label: 'มาเลเซีย',
      code: 'my',
      value: '+60',
      image: require('../../../assets/images/flags/my.png'),
    },
  ]);

  // initialize selected language
  
  const [currentLanguage, setCurrentLanguage] = useState<ILangOption>(
    languageList[0]
  );
  

  useEffect(() => {
    // find current language
    const _currentLanguage = languageList.find(
      (item) => item.code === i18n.language
    );

    // if current language is found, set it
    // else set default language by index 0
    if (_currentLanguage) {
      setCurrentLanguage(_currentLanguage);
    } else {
      setCurrentLanguage(languageList[0]);
    }
  }, [languageList, i18n.language]);

  // render bottom sheet backdrop
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );

  // render bottom sheet flat list
  const renderFlatListItem = useCallback(
    ({ item }: { item: ILangOption }) => (
      <Box
        px={4}
        backgroundColor={
          currentLanguage?.code === item.code ? 'gray.50' : 'white'
        }
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => changeLanguage(item)}
        >
          <HStack alignItems="center" justifyContent="space-between" py={3}>
            <HStack alignItems="center" space={3}>
              <Image source={item.image} style={{ width: 28, height: 28 }} />
              <Text>{item.label}</Text>
            </HStack>
            <Center
              width={6}
              height={6}
              backgroundColor={
                currentLanguage?.code === item.code ? 'green.500' : 'gray.100'
              }
              borderRadius="full"
            >
              <SharedFontAwesome icon={faCheck} color="white" size={14} />
            </Center>
          </HStack>
        </TouchableOpacity>
      </Box>
    ),
    [currentLanguage]
  );

  /**
   * Handle bottom sheet open
   */
  const handleBottomSheetModalOpen = useCallback(() => {
    // open bottom sheet modal
    bottomSheetModalRef.current?.present();
  }, []);

  /**
   * Handle bottom sheet close
   */
  const handleBottomSheetModalClose = () => {
    // dissmiss bottom sheet modal
    bottomSheetModalRef.current?.dismiss();
  };

  const changeLanguage = (lang: ILangOption) => {
    i18n.changeLanguage(lang.code);
    setCurrentLanguage(lang);
    handleBottomSheetModalClose();
  };

  return (
    <Box>
      <Button
        backgroundColor="white"
        borderWidth="1px"
        borderColor="gray.200"
        paddingY={2}
        paddingX={3}
        _text={{ color: 'gray.600' }}
        onPress={handleBottomSheetModalOpen}
      >
        <HStack flexDirection="row" alignItems="center" space={2}>
          <Image
            style={{ width: 22, height: 22 }}
            source={currentLanguage?.image}
          />
          <Text>{currentLanguage?.code.toUpperCase()}</Text>
        </HStack>
      </Button>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose={true}
        animateOnMount={true}
        backdropComponent={renderBackdrop}
      >
        <Box pt={4}>
          <Heading px={4} mb={4}>
            เลือกภาษา
          </Heading>
        </Box>
        <BottomSheetFlatList<ILangOption>
          data={languageList}
          keyExtractor={(i: any) => i.value}
          renderItem={renderFlatListItem}
        />
      </BottomSheetModal>
    </Box>
  );
}

export default SharedLanguageSwitcher;
