import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button title="C" onPress={handleClear} style={styles.clearButton} />
          <Button title="÷" onPress={() => handleOperation('÷')} style={styles.operationButton} />
          <Button title="×" onPress={() => handleOperation('×')} style={styles.operationButton} />
          <Button title="−" onPress={() => handleOperation('-')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button title="7" onPress={() => handleNumber(7)} />
          <Button title="8" onPress={() => handleNumber(8)} />
          <Button title="9" onPress={() => handleNumber(9)} />
          <Button title="+" onPress={() => handleOperation('+')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button title="4" onPress={() => handleNumber(4)} />
          <Button title="5" onPress={() => handleNumber(5)} />
          <Button title="6" onPress={() => handleNumber(6)} />
        </View>

        <View style={styles.row}>
          <Button title="1" onPress={() => handleNumber(1)} />
          <Button title="2" onPress={() => handleNumber(2)} />
          <Button title="3" onPress={() => handleNumber(3)} />
          <Button title="=" onPress={handleEquals} style={[styles.operationButton, styles.equalsButton]} />
        </View>

        <View style={styles.row}>
          <Button title="0" onPress={() => handleNumber(0)} style={styles.zeroButton} />
          <Button title="." onPress={handleDecimal} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  displayContainer: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-end',
  },
  display: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
  operationButton: {
    backgroundColor: '#ff9500',
  },
  clearButton: {
    backgroundColor: '#d4d4d4',
  },
  equalsButton: {
    flex: 1.5,
  },
  zeroButton: {
    flex: 2.5,
  },
});