import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@firebase/config';
import { copy, outputImage } from '@assets';
import * as Clipboard from 'expo-clipboard';
import { i18n } from '@i18n';
import { styles } from './styles';

type Entry = {
  prompt: string;
  status: string;
  style: string;
};

interface OutputModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  docId: any;
}

const OutputModal = ({ visible, setVisible, docId }: OutputModalProps) => {
  const [entry, setEntry] = useState<Entry>();
  const getEntry = async (docId: string) => {
    const docRef = doc(db, 'generations', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setEntry(data);
    } else {
      setEntry(undefined);
    }
  };

  useEffect(() => {
    getEntry(docId);
  }, [docId]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(entry?.prompt || '');
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <LinearGradient
          colors={['#0F0C29', '#302B63', '#24243e']}
          style={styles.linear}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{i18n.t('yourDesign')}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}
                >
                  <Text style={styles.closeText}>{i18n.t('closeIcon')}</Text>
                </TouchableOpacity>
              </View>
              <Image
                resizeMode='contain'
                source={outputImage}
                style={styles.image}
              />
              <View style={styles.promptContainer}>
                <View style={styles.bottomContainer}>
                  <Text style={styles.prompt}>{i18n.t('prompt')}</Text>
                  <TouchableOpacity
                    onPress={copyToClipboard}
                    style={styles.copyContainer}
                  >
                    <Image source={copy} />
                    <Text style={styles.copy}>{i18n.t('copy')}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.entry}>{entry?.prompt}</Text>
                <View style={styles.styleContainer}>
                  <Text style={styles.style}>{entry?.style}</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default OutputModal;
