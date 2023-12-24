import React, { useContext, useEffect, useRef } from 'react';
import { AudioContextCtx } from '../../providers/AudioContextProvider';

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const { frequencyData } = useContext(AudioContextCtx)

  useEffect(() => {
	if(frequencyData){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the frequency bars
      const barWidth = canvas.width / frequencyData.length;

      frequencyData.forEach((value, index) => {
        const barHeight = value;
        const x = index * barWidth;
        const y = canvas.height - barHeight;

        ctx.fillStyle = `rgb(0, 0, ${value})`;
        ctx.fillRect(x, y, barWidth, barHeight);
      });

      // Request the next animation frame
      requestAnimationFrame(draw);}
    };

    // Initial setup
    draw();
  }, [frequencyData]);

  return <canvas ref={canvasRef} width={800} height={300} />;
};

export default AudioVisualizer;
