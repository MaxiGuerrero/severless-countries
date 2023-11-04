import { splitArray } from "../splitArray";

test("Split array in arrays chunks by a number size", () => {
  // Assing
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chunkSize = 2;
  // Act
  const chunks = splitArray(array, chunkSize);
  // Assert
  expect(chunks).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ]);
});
