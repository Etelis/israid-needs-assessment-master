import { registerSW } from 'virtual:pwa-register';

export default () => {
  const updateSW = registerSW({
    onRegistered(worker) {
      if (!worker) {
        return;
      }

      setInterval(() => {
        worker.update();
      }, 60 * 1000);
    },
    onNeedRefresh(...x) {
      alert('A new version is now available!');
      // TODO: ask if they want to see the new version so it wont exit when answering questions.
      updateSW();
    }
  })
}