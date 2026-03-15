import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 40,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: '5%',
    marginTop: '3%',
    borderRadius: 10,
  },
  createForgotLink: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
