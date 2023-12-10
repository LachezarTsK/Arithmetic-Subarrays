
#include <span>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    
    int minValue;
    int maxValue;
    int numberOfElements;

public:
    vector<bool> checkArithmeticSubarrays(const vector<int>& input, const vector<int>& left, const vector<int>& right) {
        int numberOfSubarrays = left.size();
        vector<bool> arithmeticSubarrays(numberOfSubarrays);
        for (int i = 0; i < numberOfSubarrays; ++i) {
            arithmeticSubarrays[i] = isArithmeticSubarray(input, left[i], right[i]);
        }
        return arithmeticSubarrays;
    }

private:
    bool isArithmeticSubarray(span<const int> input, int left, int right) {
        numberOfElements = right - left + 1;
        minValue = INT_MAX;
        maxValue = INT_MIN;
        for (int i = left; i <= right; ++i) {
            minValue = min(minValue, input[i]);
            maxValue = max(maxValue, input[i]);
        }

        if ((maxValue - minValue) % (numberOfElements - 1) != 0) {
            return false;
        }

        return allElementsBelongToTheExpectedArithmeticProgression(input, left, right);
    }

    bool allElementsBelongToTheExpectedArithmeticProgression(span<const int> input, int left, int right) const {
        if (minValue == maxValue) {
            return true;
        }

        vector<bool> visited(maxValue - minValue + 1);
        for (size_t i = left; i <= right; ++i) {
            visited[input[i] - minValue] = true;
        }

        int expectedStep = (maxValue - minValue) / (numberOfElements - 1);
        int currentValue = minValue;

        for (size_t i = 0; i < numberOfElements; ++i) {
            if (!visited[currentValue - minValue]) {
                return false;
            }
            currentValue += expectedStep;
        }
        return true;
    }
};
