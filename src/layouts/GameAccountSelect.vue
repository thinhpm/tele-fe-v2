<template>
  <div>
    <label for="game">Game</label>
    <select id="game" v-model="selectedGame" @change="onGameChange">
      <option value="" disabled>Select a game</option>
      <option v-for="game in games" :key="game.game_id" :value="game.game_id">{{ game.game_name }}</option>
    </select>

    <label for="user">User</label>
    <select id="user" v-model="selectedUser" @change="onUserChange">
      <option value="" disabled>Select a user</option>
      <option v-for="user in filteredAccounts" :key="user.token">{{ user.name }}</option>
    </select>

    <div v-if="selectedUserDetails">
      <label for="userName">Name</label>
      <input id="userName" type="text" v-model="selectedUserDetails.name" />

      <label for="userToken">Token</label>
      <textarea id="userToken" v-model="selectedUserDetails.token" rows="5" cols="30" :readonly="!isEditingToken"></textarea>

      <label for="userServer">Server</label>
      <input id="userServer" type="text" v-model="selectedUserDetails.server" readonly />

      <div>
        <button @click="addToken">Add</button>
        <button @click="enableEditing">Edit</button>
        <button @click="deleteToken">Delete</button>
        <button @click="saveToken" v-if="isEditingToken">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const games = ref([])
const accounts = ref([])
const selectedGame = ref('')
const selectedUser = ref('')
const selectedUserDetails = ref(null)
const isEditingToken = ref(false)

// Fetch games data from API
const fetchGames = async () => {
  try {
    const response = await axios.get('https://thinhpm-tele-be.hf.space/api/v1/games')
    if (response.data.status === 'Success') {
      games.value = response.data.data.map(game => ({
        game_id: game.game_id,
        game_name: game.game_name,
        account: game.account
      }))
    } else {
      console.error('API returned an error:', response.data.status)
    }
  } catch (error) {
    console.error('Failed to fetch games:', error)
  }
}

// Handle game selection change
const onGameChange = () => {
  const game = games.value.find(g => g.game_id === selectedGame.value)
  accounts.value = game ? game.account : []
  selectedUser.value = '' // Reset user selection
  selectedUserDetails.value = null // Reset user details
}

// Handle user selection change
const onUserChange = () => {
  selectedUserDetails.value = accounts.value.find(user => user.name === selectedUser.value) || null
}

// Filtered accounts based on selected game
const filteredAccounts = computed(() => {
  const game = games.value.find(g => g.game_id === selectedGame.value)
  return game ? game.account : []
})

// Enable token editing
const enableEditing = () => {
  isEditingToken.value = true
}

// Save the edited token
const saveToken = async () => {
  if (!selectedUserDetails.value) return

  try {
    const response = await axios.put(`https://thinhpm-tele-be.hf.space/api/v1/games/${selectedUserDetails.value.token}`, {
      name: selectedUserDetails.value.name,
      token: selectedUserDetails.value.token,
      server: selectedUserDetails.value.server
    })
    if (response.data.status === 'Success') {
      console.log('Token updated successfully')
      isEditingToken.value = false
      await fetchGames() // Refresh games data
    } else {
      console.error('Failed to update token:', response.data.status)
    }
  } catch (error) {
    console.error('Failed to update token:', error)
  }
}

// Add a new token (dummy implementation)
const addToken = async () => {
  try {
    // Replace with actual API call
    const response = await axios.post('https://thinhpm-tele-be.hf.space/api/v1/games', {
      // Data for the new token
    })
    if (response.data.status === 'Success') {
      console.log('Token added successfully')
      await fetchGames() // Refresh games data
    } else {
      console.error('Failed to add token:', response.data.status)
    }
  } catch (error) {
    console.error('Failed to add token:', error)
  }
}

// Delete the current token
const deleteToken = async () => {
  if (!selectedUserDetails.value) return

  try {
    const response = await axios.delete(`https://thinhpm-tele-be.hf.space/api/v1/games/${selectedUserDetails.value.token}`)
    if (response.data.status === 'Success') {
      console.log('Token deleted successfully')
      await fetchGames() // Refresh games data
    } else {
      console.error('Failed to delete token:', response.data.status)
    }
  } catch (error) {
    console.error('Failed to delete token:', error)
  }
}

onMounted(fetchGames)
</script>
