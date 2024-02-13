function mapLinearToColor(
    value: number,
    minValue: number,
    maxValue: number,
    startColor: number[],
    endColor: number[]
  ) {
    // Ensure the value is within the specified range
    const clampedValue = Math.max(minValue, Math.min(value, maxValue));
  
    // Normalize the value between 0 and 1
    const normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
  
    // Interpolate between startColor and endColor based on the normalized value
    const r = Math.round(
      startColor[0] + normalizedValue * (endColor[0] - startColor[0])
    );
    const g = Math.round(
      startColor[1] + normalizedValue * (endColor[1] - startColor[1])
    );
    const b = Math.round(
      startColor[2] + normalizedValue * (endColor[2] - startColor[2])
    );
  
    // Return the RGB color as a string
    return `rgb(${r},${g},${b})`;
  }
  
  export interface Data {
    x: number;
    y: number;
    color: string;
    size: number;
  }
  
  export const generateRandomData = (options: {
    count: number;
    maxX: number;
    maxY: number;
    startX: number;
    startY: number;
    style: string;
  }): Data[] => {
    const data: Data[] = [];
    const startColor = [255, 0, 0]; // Red
    const endColor = [0, 0, 255]; // Blue
  
    for (let i = 0; i < options.count; i++) {
      let resultColor = "blue";
      let size = 5;
  
      const x = Math.random() * options.maxX;
      const y = Math.random() * options.maxY;
      if (options.style === "different") {
        resultColor = mapLinearToColor(x, 0, options.maxX, startColor, endColor);
        size = (y / options.maxY) * 5 + 1;
      }
    
      data.push({
        x: x + options.startX,
        y: y + options.startY,
        color: resultColor,
        size,
      });
    }
  
    return data;
  };
  