const { createClient } =require ('redis');


(async () => {
  const client = createClient(6370);

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  // await client.set('keyxx', 'valuezzz');
  // const value = await client.get('key');
  // console.log(value)
  // await client.sendCommand(['SET', 'key', 'value', 'NX']); // 'OK'
  // await client.sendCommand(['HGETALL', 'key']); // ['key1', 'field1', 'key2', 'field2']
  // await client.disconnect();

  await client.ping();

})();