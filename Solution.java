
import java.util.ArrayList;
import java.util.List;

public class Solution {

    int minValue;
    int maxValue;
    int numberOfElements;

    public List<Boolean> checkArithmeticSubarrays(int[] input, int[] left, int[] right) {
        List<Boolean> arithmeticSubarrays = new ArrayList<>();
        int numberOfSubarrays = left.length;
        for (int i = 0; i < numberOfSubarrays; ++i) {
            arithmeticSubarrays.add(isArithmeticSubarray(input, left[i], right[i]));
        }
        return arithmeticSubarrays;
    }

    private boolean isArithmeticSubarray(int[] input, int left, int right) {
        numberOfElements = right - left + 1;
        minValue = Integer.MAX_VALUE;
        maxValue = Integer.MIN_VALUE;
        for (int i = left; i <= right; ++i) {
            minValue = Math.min(minValue, input[i]);
            maxValue = Math.max(maxValue, input[i]);
        }

        if ((maxValue - minValue) % (numberOfElements - 1) != 0) {
            return false;
        }

        return allElementsBelongToTheExpectedArithmeticProgression(input, left, right);
    }

    private boolean allElementsBelongToTheExpectedArithmeticProgression(int[] input, int left, int right) {
        if (minValue == maxValue) {
            return true;
        }

        boolean[] visited = new boolean[maxValue - minValue + 1];
        for (int i = left; i <= right; ++i) {
            visited[input[i] - minValue] = true;
        }

        int expectedStep = (maxValue - minValue) / (numberOfElements - 1);
        int currentValue = minValue;

        for (int i = 0; i < numberOfElements; ++i) {
            if (!visited[currentValue - minValue]) {
                return false;
            }
            currentValue += expectedStep;
        }
        return true;
    }
}
