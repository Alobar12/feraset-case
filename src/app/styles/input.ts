import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'space-between'
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    color: '#fff'
  },
  generateButton: {
    width: '100%',
    height: 56,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 12
  },
  generateButtonText: {
    fontSize: 17,
    fontFamily: 'ExtraBold',
    lineHeight: 22,
    color: '#FAFAFA'
  },
  header: {
    fontSize: 17,
    fontFamily: 'Bold',
    color: '#FAFAFA'
  },
  promptLabel: {
    color: '#FAFAFA',
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'ExtraBold'
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
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'Regular',
    height: 175,
    textAlignVertical: 'top'
  },
  surpriseButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  surpriseText: {
    color: 'white',
    marginLeft: 5
  },
  logoStylesTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'ExtraBold',
    marginBottom: 12
  },
  stylesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: '100%'
  },
  logoStyleButton: {
    marginRight: 12
  },
  logoStyleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  promptLength: {
    position: 'absolute',
    color: '#71717A',
    bottom: 15,
    left: 12
  },
  prompt: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  listContainer: {
    paddingLeft: 24
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginBottom: 6
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#FAFAFA'
  },
  itemImageContainer: {
    flex: 1,
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  buttonContainer: {
    paddingHorizontal: 24
  },
  buttonImage: {
    width: 20,
    height: 20
  },
  wrapper: {
    paddingHorizontal: 24
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 19,
    justifyContent: 'center'
  },
  safeArea: {
    flex: 1
  },
  inputContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: '#09090B'
  }
});
