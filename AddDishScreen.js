
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from '../context/MenuContext';

const COURSES = ['Starters', 'Mains', 'Desserts'];

export default function AddDishScreen({ navigation }) {
  const { addDish } = useContext(MenuContext);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [course, setCourse] = useState(COURSES[1]); // default Mains
  const [price, setPrice] = useState('');

  const reset = () => {
    setName('');
    setDesc('');
    setCourse(COURSES[1]);
    setPrice('');
  };

  const handleAdd = () => {
    if (!name.trim()) return Alert.alert('Validation', 'Please enter a dish name.');
    if (!price.trim()) return Alert.alert('Validation', 'Please enter the price.');
    const p = parseFloat(price.replace(',', '.'));
    if (Number.isNaN(p) || p <= 0) return Alert.alert('Validation', 'Enter a valid price greater than 0.');

    const dish = {
      id: Date.now().toString(),
      name: name.trim(),
      description: desc.trim(),
      course,
      price: Number(p.toFixed(2))
    };

    addDish(dish);
    Alert.alert('Success', 'Dish added to the menu.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    reset();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.form}>
        <Text style={styles.label}>Dish name *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Pan-seared hake" />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textarea]} value={desc} onChangeText={setDesc} placeholder="Short description" multiline />

        <Text style={styles.label}>Course *</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={course} onValueChange={(v) => setCourse(v)}>
            {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>
        </View>

        <Text style={styles.label}>Price (R) *</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="e.g. 120.50" keyboardType="numeric" />

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addText}>Add Dish</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearBtn} onPress={reset}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: '#fff', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  label: { fontWeight: '700', color: '#111827', marginTop: 8, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#f1f2f4', padding: 10, borderRadius: 10, backgroundColor: '#fafafa' },
  textarea: { minHeight: 80, textAlignVertical: 'top' },
  pickerWrap: { borderWidth: 1, borderColor: '#f1f2f4', borderRadius: 10, overflow: 'hidden', backgroundColor: '#fafafa' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  addBtn: { flex: 1, backgroundColor: '#b8860b', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8 },
  addText: { color: '#fff', fontWeight: '700' },
  clearBtn: { width: 96, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  clearText: { color: '#374151' }
});
