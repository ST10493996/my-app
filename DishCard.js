import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MenuContext } from '../context/MenuContext';
import DishCard from '../components/DishCard';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { menu, removeDish } = useContext(MenuContext);

  // grouping order Starters -> Mains -> Desserts
  const order = ['Starters', 'Mains', 'Desserts'];
  const grouped = useMemo(() => {
    const groups = { Starters: [], Mains: [], Desserts: [] };
    menu.forEach(m => {
      if (groups[m.course]) groups[m.course].push(m);
      else groups.Mains.push(m);
    });
    return [...groups.Starters, ...groups.Mains, ...groups.Desserts];
  }, [menu]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Christoffel’s Culinary Menu</Text>
          <Text style={styles.subtitle}>A live list of items the chef adds.</Text>
        </View>

        <View style={styles.countWrap}>
          <Text style={styles.countLabel}>Total</Text>
          <Text style={styles.count}>{menu.length}</Text>
        </View>
      </View>

      {grouped.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No dishes yet. Use the + button to add menu items.</Text>
        </View>
      ) : (
        <FlatList
          data={grouped}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <DishCard dish={item} onDelete={removeDish} />}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 120 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddDish')}
        accessibilityLabel="Add dish"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6b7280' },
  countWrap: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#f3f4f6', paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' },
  countLabel: { color: '#6b7280', fontWeight: '700' },
  count: { fontWeight: '800', fontSize: 18, color: '#b8860b' },

  empty: { marginTop: 40, alignItems: 'center' },
  emptyText: { color: '#6b7280' },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    backgroundColor: '#b8860b',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6
  }
});
