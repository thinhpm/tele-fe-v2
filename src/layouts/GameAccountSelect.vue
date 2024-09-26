<template>
  <div>
    <div class="game">
      <div class="game_name">
        <label for="game">Game</label>
        <select id="game" v-model="selectedGame" @change="onGameChange">
          <option value="" disabled>Select a game</option>
          <option v-for="game in games" :key="game.game_id" :value="game.game_id">{{ game.game_name }}</option>
        </select>
      </div>

      <div class="game_user">
        <label for="user">User</label>
        <select id="user" v-model="selectedUser" @change="onUserChange">
          <option value="" disabled>Select a user</option>
          <option v-for="user in filteredAccounts" :key="user.token">{{ user.name }}</option>
        </select>
      </div>
    </div>

<div class="game_info" v-if="selectedUserDetails && !isAddingGame">
  <div class="game_info_row game_info_name">
    <label for="userName">User</label>
    <input id="userName" type="text" v-model="selectedUserDetails.name" />
  </div>
  <div class="game_info_row game_info_token">
    <label for="userToken">Token</label>
    <textarea id="userToken" v-model="selectedUserDetails.token" rows="5" cols="30" :readonly="!isEditingToken"></textarea>
  </div>
  <div class="game_info_row game_info_sever">
    <label for="userServer">Server</label>
    <input id="userServer" type="text" v-model="selectedUserDetails.server" readonly />
  </div>
  <div class="game_info_row game_info_stt">
    <label for="userStatus">Status</label>
    <input id="userStatus" type="text" v-model="selectedUserDetails.active" readonly />
  </div>
</div>

<div class="game_info" v-if="isAddingGame">
  <div class="game_info_row game_info_name">
    <label for="newGameName">Game</label>
    <input id="newGameName" type="text" v-model="newGameDetails.game_name" placeholder="gêm nêm" />
  </div>
  <div class="game_info_row game_info_id">
    <label for="newGameId">ID</label>
    <input id="newGameId" type="text" v-model="newGameDetails.game_id" placeholder="ID gêm" />
  </div>
  <div class="game_info_row game_info_token">
    <label for="newGameToken">Token</label>
    <textarea id="newGameToken" v-model="newGameDetails.token" rows="5" cols="30" placeholder="token"></textarea>
  </div>
  <div class="game_info_row game_info_sever">
    <label for="newGameServer">Server</label>
    <input id="newGameServer" type="text" v-model="newGameDetails.server" placeholder="server" />
  </div>
  <div class="game_info_row game_info_stt">
    <label for="newGameStatus">Status</label>
    <select id="newGameStatus" v-model="newGameDetails.active">
      <option :value="true">true</option>
      <option :value="false">flase</option>
    </select>
  </div>
  <button @click="saveNewGame">Add New Game</button>
</div>

<div class="button">
  <button @click="addToken">Add</button>
  <button @click="enableEditing" v-if="selectedUserDetails && !isAddingGame">Edit</button>
  <button @click="deleteToken" v-if="selectedUserDetails && !isAddingGame">Delete</button>
  <button @click="saveToken" v-if="isEditingToken && !isAddingGame">Save</button>
</div>

      <div v-if="editMessage" class="edit-message">
        {{ editMessage }}
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

const saveToken = async () => {
  if (!selectedUserDetails.value) return

  try {
    const response = await axios.put(`https://thinhpm-tele-be.hf.space/api/v1/games/${selectedUserDetails.value.token}`, {
      name: selectedUserDetails.value.name,
      token: selectedUserDetails.value.token,
      server: selectedUserDetails.value.server,
      game_id: selectedGame.value,
      status: selectedUserDetails.value.active
    })
    if (response.data.status === 'Success') {
      console.log('Token updated successfully')
      isEditingToken.value = false
      await fetchGames() // Refresh games data
    
      editMessage.value = 'Chỉnh sửa thành công!'
    } else {
      console.error('Failed to update token:', response.data.status)
      
      editMessage.value = 'Chỉnh sửa thất bại!'
    }
  } catch (error) {
    console.error('Failed to update token:', error)
  
    editMessage.value = 'Có lỗi xảy ra khi chỉnh sửa!'
  }
}


const editMessage = ref('')

const isAddingGame = ref(false)
const newGameDetails = ref({
  game_name: '',
  game_id: '',
  token: '',
  server: '',
  active: false
}) 

const addToken = () => {
  isAddingGame.value = true
  newGameDetails.value = {
    game_name: '',
    game_id: '',
    token: '',
    server: '',
    active: false
  }
  selectedUserDetails.value = null 
}

const saveNewGame = async () => {
  if (!newGameDetails.value.game_name || !newGameDetails.value.game_id) {
    alert('Vui lòng nhập tên và ID của game.')
    return
  }

  try {
    const payload = {
      game_name: newGameDetails.value.game_name,
      game_id: newGameDetails.value.game_id,
      account: [{
        name: newGameDetails.value.game_name,
        token: newGameDetails.value.token,
        server: newGameDetails.value.server,
        active: newGameDetails.value.active
      }]
    }

    const response = await axios.post('https://thinhpm-tele-be.hf.space/api/v1/games', payload)
    if (response.data.status === 'Success') {
      console.log('Game mới được thêm thành công')
      await fetchGames() 
      isAddingGame.value = false
      newGameDetails.value = { game_name: '', game_id: '', token: '', server: '', active: false }
      alert('Game mới đã được lưu thành công!')
    } else {
      console.error('Thêm game thất bại:', response.data.status)
      alert('Thêm game thất bại!')
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm game:', error)
    alert('Có lỗi xảy ra khi thêm game!')
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
