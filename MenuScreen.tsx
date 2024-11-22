import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Dish = {
  name: string;
  description: string;
  course: string;
  price: string;
  image: string;
};

const MenuScreen: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]);

  const availableDishes: Dish[] = [
    { name: 'Spaghetti Carbonara', description: 'Classic Italian pasta.', course: 'Main', price: '120', image: 'https://res.cloudinary.com/dvsalfqdn/image/upload/v1732104215/pasta-4625962_640_r7tupy.jpg' },
    { name: 'Caesar Salad', description: 'Crispy lettuce with Caesar dressing.', course: 'Starter', price: '80', image: 'https://res.cloudinary.com/dvsalfqdn/image/upload/v1732104210/salad-791891_640_ohltjs.jpg' },
    { name: 'Cheesecake', description: 'Creamy cheesecake with a graham crust.', course: 'Dessert', price: '90', image: 'https://res.cloudinary.com/dvsalfqdn/image/upload/v1732104204/cheese-cake-3681694_640_ec5tnw.jpg' },
    { name: 'Grilled Chicken', description: 'Juicy grilled chicken with herbs.', course: 'Main', price: '150', image: 'https://res.cloudinary.com/dvsalfqdn/image/upload/v1732104198/ai-generated-8542471_640_proylv.jpg' },
    { name: 'Minestrone Soup', description: 'Hearty vegetable soup.', course: 'Starter', price: '70', image: 'https://res.cloudinary.com/dvsalfqdn/image/upload/v1732104185/soup-1503117_640_ay26cf.jpg' },
    { name: 'Brownie Sundae', description: 'Chocolate brownie with ice cream.', course: 'Dessert', price: '95', image: 'https://res.cloudinary.com/dvsalfqdn/image/upload/v1732104135/cupcakes-8342833_640_yoriz5.jpg' },
  ];
  
  const addDish = () => {
    if (!selectedDish || !course || !price) {
      Alert.alert('Error', 'Please fill in all fields before adding a dish.');
      return;
    }

    const selectedDishDetails = availableDishes.find((dish) => dish.name === selectedDish);
    if (selectedDishDetails) {
      setDishes([...dishes, { ...selectedDishDetails, course, price }]);
    }

    setSelectedDish('');
    setCourse('');
    setPrice('');
  };

  const removeDish = (index: number) => {
    setDishes(dishes.filter((_, i) => i !== index));
  };

  const calculateAveragePrice = (): number => {
    if (dishes.length === 0) return 0; // Avoid division by zero
    const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
    return total / dishes.length;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Christoffel's Restaurant Menu</Text>

        <Text style={styles.label}>Select a Dish:</Text>
        <Picker
          selectedValue={selectedDish}
          onValueChange={(itemValue) => setSelectedDish(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a Dish" value="" />
          {availableDishes.map((dish, index) => (
            <Picker.Item key={index} label={dish.name} value={dish.name} />
          ))}
        </Picker>

        {selectedDish ? (
          <View style={styles.dishPreview}>
            <Image
              source={{ uri: availableDishes.find((dish) => dish.name === selectedDish)?.image }}
              style={styles.dishImage}
            />
            <Text style={styles.dishDescription}>
              {availableDishes.find((dish) => dish.name === selectedDish)?.description}
            </Text>
          </View>
        ) : null}

        <TextInput
          placeholder="Course (e.g. Starter, Main, Dessert)"
          value={course}
          onChangeText={setCourse}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />

        <Button title="Add Dish" onPress={addDish} />

        <Text style={styles.averagePrice}>
          Average Price: R{calculateAveragePrice().toFixed(2)}
        </Text>

        <Text style={styles.subTitle}>Dishes List</Text>

        <FlatList
          data={dishes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.dishItem}>
              <Image source={{ uri: item.image }} style={styles.dishImage} />
              <View style={styles.dishDetails}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>{item.course}</Text>
                <Text>Price: R{item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeDish(index)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Average Price Display */}

      </ScrollView>

      <TouchableOpacity style={styles.recordButton} onPress={() => alert('Dish details recorded!')}>
        <Text style={styles.recordButtonText}>Record Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // Light blue background
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  dishPreview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dishImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  dishItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dishDetails: {
    flex: 1,
    marginLeft: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  removeButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  averagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
  recordButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 20,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
