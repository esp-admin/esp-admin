export default function useMqtt () {
  const key = 'mqtt'
  const request = '/api/mqtt'

  const mqtt = useNuxtData<Mqtt | undefined>(key)
  const connected = useState('mqtt_connected')

  async function find () {
    mqtt.data.value ||= await useAuthFetch<Mqtt>(request)

    return mqtt.data
  }

  function update (data: Partial<Mqtt>) {
    return useAuthFetch<Mqtt>(request, {
      method: 'PATCH',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.data.value = response._data
        }
      }
    })
  }

  function add (data: Partial<Mqtt>) {
    return useAuthFetch<Mqtt>(request, {
      method: 'POST',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.data.value = response._data
        }
      }
    })
  }

  return { find, add, update, connected }
}
