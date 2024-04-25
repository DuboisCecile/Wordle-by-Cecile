import { useEffect, useState } from 'react';
import { Particles, initParticlesEngine } from '@tsparticles/react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';
const Fireworks = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFireworksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    preset: 'fireworks',
    duration: 5
  };

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return <></>;
};
export default Fireworks;
