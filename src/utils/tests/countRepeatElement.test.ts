import { countElementRepeat } from "../countRepeatElements";

const labels = ["a", "b"];

test("countElementRepeat return correct value", () => {
  // Assign
  const array = ["a", "b", "c", "c", "b", "c"];
  // Act
  const result = countElementRepeat(array, labels);
  // Assert
  expect(result).toEqual([1, 2, 3]);
});

test("countElementRepeat return array void", () => {
  // Assign
  const array = [];
  // Act
  const result = countElementRepeat(array, labels);
  // Assert
  expect(result).toEqual([]);
});
