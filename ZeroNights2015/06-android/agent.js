Dalvik.perform(() => {
  const MainActivity = Dalvik.use(
      're.plawnekjx.helloworld.MainActivity');
  MainActivity.isRegistered.implementation = () => {
    console.log('isRegistered() w00t');
    return true;
  };
});
