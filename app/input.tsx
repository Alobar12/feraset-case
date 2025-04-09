import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@firebase/config';
import { LinearGradient } from 'expo-linear-gradient';

export default function InputScreen() {
  const [status, setStatus] = useState('waiting');
  const [docId, setDocId] = useState(null);

  const createGeneration = async () => {
    try {
      const docRef = await addDoc(collection(db, 'generations'), {
        prompt: 'abstract style',
        style: 'monogram',
        status: 'processing',
        createdAt: serverTimestamp()
      });

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
    } catch (e) {
      console.error('Error:', e);
    }
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

  return (
    <SafeAreaView style={{ padding: 20, flex: 1, backgroundColor: '#09090B' }}>
      <LinearGradient
        colors={['#0F0C29', '#302B63', '#24243e']}
        style={styles.container}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.scrollContent}>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 19,
                  justifyContent: 'center'
                }}
              >
                <Text style={styles.header}>AI Logo</Text>
              </View>
              <Text style={styles.promptLabel}>Enter Your Prompt</Text>

              <View style={styles.promptContainer}>
                <TextInput
                  placeholder='A blue lion logo reading ‘HEXA’ in bold letters'
                  placeholderTextColor='#aaa'
                  multiline
                  style={styles.promptInput}
                />
                <TouchableOpacity style={styles.surpriseButton}>
                  <Text style={styles.surpriseText}>Surprise me</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.logoStylesTitle}>Logo Styles</Text>
              <View style={styles.stylesRow}>
                {['No Style', 'Monogram', 'Abstract', 'Mascot'].map(
                  (style, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.logoStyleButton}
                    >
                      <Text style={styles.logoStyleText}>{style}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 17,
    fontFamily: 'Bold',
    color: '#FAFAFA'
  },
  promptLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10
  },
  promptContainer: {
    backgroundColor: '#1e1e2f',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    position: 'relative'
  },
  promptInput: {
    color: 'white',
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top'
  },
  surpriseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  surpriseText: {
    color: 'white',
    marginLeft: 5
  },
  logoStylesTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10
  },
  stylesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  logoStyleButton: {
    backgroundColor: '#2e2e44',
    borderRadius: 15,
    padding: 15,
    width: 70,
    alignItems: 'center'
  },
  logoStyleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  createButton: {
    backgroundColor: '#7f00ff',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center'
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});
