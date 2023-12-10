
using System;

public class Solution
{
    int minValue;
    int maxValue;
    int numberOfElements;

    public IList<bool> CheckArithmeticSubarrays(int[] input, int[] left, int[] right)
    {
        IList<bool> arithmeticSubarrays = new List<bool>();
        int numberOfSubarrays = left.Length;
        for (int i = 0; i < numberOfSubarrays; ++i)
        {
            arithmeticSubarrays.Add(IsArithmeticSubarray(input, left[i], right[i]));
        }
        return arithmeticSubarrays;
    }

    private bool IsArithmeticSubarray(int[] input, int left, int right)
    {
        numberOfElements = right - left + 1;
        minValue = int.MaxValue;
        maxValue = int.MinValue;
        for (int i = left; i <= right; ++i)
        {
            minValue = Math.Min(minValue, input[i]);
            maxValue = Math.Max(maxValue, input[i]);
        }

        if ((maxValue - minValue) % (numberOfElements - 1) != 0)
        {
            return false;
        }

        return AllElementsBelongToTheExpectedArithmeticProgression(input, left, right);
    }

    private bool AllElementsBelongToTheExpectedArithmeticProgression(int[] input, int left, int right)
    {
        if (minValue == maxValue)
        {
            return true;
        }

        bool[] visited = new bool[maxValue - minValue + 1];
        for (int i = left; i <= right; ++i)
        {
            visited[input[i] - minValue] = true;
        }

        int expectedStep = (maxValue - minValue) / (numberOfElements - 1);
        int currentValue = minValue;

        for (int i = 0; i < numberOfElements; ++i)
        {
            if (!visited[currentValue - minValue])
            {
                return false;
            }
            currentValue += expectedStep;
        }
        return true;
    }
}
