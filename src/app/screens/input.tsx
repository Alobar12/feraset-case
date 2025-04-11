import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  FieldValue
} from 'firebase/firestore';
import { db } from '@/src/app/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import {
  abstract,
  chipError,
  chipReadyIcon,
  mascot,
  monogram,
  nullImage,
  stars
} from '@assets';
import { i18n } from '@i18n';
import { Chip, OutputModal } from '@components';
import styles from '../styles/input';
import { DocumentReference } from 'firebase/firestore';

const maxLength = 500;

type LogoStyle = {
  image: string;
  label: string;
};

interface InputPage {
  LogoStyles: {
    image: any;
    label: string;
  }[];
}

type Generation = {
  prompt: string;
  style: string;
  status: 'processing' | 'done';
  createdAt: FieldValue;
  completedAt?: FieldValue;
};

type ChipComponentAttributes = {
  title: string;
  content: string;
  contentColor: string;
  backgroundColor: string;
  icon?: string;
  iconBackgroundColor?: string;
  errorIcon?: string;
  onPress?: () => void;
};

const logoStylesData: InputPage['LogoStyles'] = [
  {
    image: nullImage,
    label: 'No Style'
  },
  {
    image: monogram,
    label: 'Monogram'
  },
  {
    image: abstract,
    label: 'Abstract'
  },
  {
    image: mascot,
    label: 'Mascot'
  }
];

export default function InputScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [status, setStatus] = useState<string>('waiting');
  const [logoStyles, setLogoStyles] = useState<LogoStyle['label']>('No Style');
  const [docId, setDocId] = useState(null);
  const [prompt, setPrompt] = useState<string>('');

  const createGeneration = async () => {
    try {
      const docRef: DocumentReference<Generation> = await addDoc(
        collection(db, 'generations'),
        {
          prompt,
          style: logoStyles,
          status: 'processing',
          createdAt: serverTimestamp()
        }
      );
      setDocId(docRef?.id);
      setStatus('processing');

      const delay = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;

      setTimeout(async () => {
        const docSnap = doc(db, 'generations', docRef.id);
        await updateDoc(docSnap, {
          status: 'done',
          completedAt: serverTimestamp()
        });
      }, delay);
    } catch {}
  };

  useEffect(() => {
    if (!docId) return;

    const unsub = onSnapshot(doc(db, 'generations', docId), snapshot => {
      const data = snapshot.data();
      if (data?.status) {
        setStatus(data.status);
      }
    });

    return () => unsub();
  }, [docId]);

  const handleChangeText = useCallback((text: string) => {
    setPrompt(text);
  }, []);

  const chipComponentAttributes = (): ChipComponentAttributes => {
    switch (status) {
      case 'processing':
        return {
          title: 'Creating Your Design...',
          content: 'Ready in 2 minutes',
          contentColor: '#71717A',
          backgroundColor: '#27272A',
          iconBackgroundColor: '#18181B'
        };
      case 'done':
        return {
          title: 'Your Design is Ready!',
          content: 'Tap to see it.',
          contentColor: '#D4D4D8',
          icon: chipReadyIcon,
          backgroundColor: '#943DFF',
          onPress: () => {
            setModalVisible(true);
            setStatus('waiting');
            setPrompt('');
          }
        };
      case 'error':
        return {
          title: 'Oops, something went wrong!',
          content: 'Click to try again.',
          contentColor: '#D4D4D8',
          icon: chipReadyIcon,
          backgroundColor: '#EF4444',
          iconBackgroundColor: '#EF4444B2',
          errorIcon: chipError,
          onPress: () => createGeneration()
        };
      default:
        return {
          title: 'Creating Your Design...',
          content: 'Ready in 2 minutes',
          contentColor: '#71717A',
          backgroundColor: '#27272A',
          iconBackgroundColor: '#18181B'
        };
    }
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <LinearGradient
        colors={['#0F0C29', '#302B63', '#24243e']}
        style={styles.container}
      >
        <View style={styles.safeArea}>
          <View style={styles.scrollContent}>
            <View>
              <View style={styles.wrapper}>
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>{i18n.t('projectName')}</Text>
                </View>
                {status !== 'waiting' && (
                  <Chip
                    title={chipComponentAttributes().title}
                    content={chipComponentAttributes().content}
                    backgroundColor={chipComponentAttributes().backgroundColor}
                    contentColor={chipComponentAttributes().contentColor}
                    icon={chipComponentAttributes().icon}
                    iconBackgroundColor={
                      chipComponentAttributes().iconBackgroundColor
                    }
                    status={status}
                    onPress={chipComponentAttributes().onPress}
                    errorIcon={chipComponentAttributes().errorIcon}
                  />
                )}
                <View style={styles.prompt}>
                  <Text style={styles.promptLabel}>
                    {i18n.t('enterYourPrompt')}
                  </Text>
                  <TouchableOpacity style={styles.surpriseButton}>
                    <Text style={styles.surpriseText}>
                      {i18n.t('surpriseMe')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.promptContainer}>
                  <TextInput
                    placeholder='A blue lion logo reading ‘HEXA’ in bold letters'
                    placeholderTextColor='#aaa'
                    multiline
                    style={styles.promptInput}
                    value={prompt}
                    onChangeText={handleChangeText}
                  />
                  <Text style={styles.promptLength}>
                    {`${prompt.length}/${maxLength}`}
                  </Text>
                </View>

                <Text style={styles.logoStylesTitle}>
                  {i18n.t('logoStyles')}
                </Text>
              </View>
              <View style={styles.stylesRow}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  style={styles.listContainer}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.label}
                      onPress={() => setLogoStyles(item.label)}
                      style={styles.logoStyleButton}
                    >
                      {item.image !== nullImage ? (
                        <Image
                          source={item.image}
                          style={[
                            styles.itemImage,
                            logoStyles === item.label && styles.selectedItem
                          ]}
                        />
                      ) : (
                        <View
                          style={[
                            styles.itemImageContainer,
                            logoStyles === item.label && styles.selectedItem
                          ]}
                        >
                          <Image
                            source={nullImage}
                            style={styles.image}
                            resizeMode='contain'
                          />
                        </View>
                      )}
                      <Text style={styles.logoStyleText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  horizontal
                  keyExtractor={(_, index) => index.toString()}
                  data={logoStylesData}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={prompt.length == 0}
                style={styles.generateButton}
                activeOpacity={0.6}
                onPress={createGeneration}
              >
                <LinearGradient
                  colors={['#943DFF', '#2938DC']}
                  start={{ x: 1, y: 0.5 }}
                  end={{ x: 0, y: 0.5 }}
                  style={[StyleSheet.absoluteFillObject, styles.buttonGradient]}
                >
                  <Text style={styles.generateButtonText}>
                    {i18n.t('create')}
                  </Text>
                  <Image source={stars} style={styles.buttonImage} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {modalVisible && (
            <OutputModal
              docId={docId}
              visible={modalVisible}
              setVisible={setModalVisible}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
