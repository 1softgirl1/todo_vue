import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        tasks: []   // ← здесь будут все твои задачи
    }),

    actions: {
        setTasks(tasks) {
            this.tasks = tasks
        },

        addTask(task) {
            this.tasks.unshift(task)
        },

        updateTask({ id, text }) {
            this.tasks = this.tasks.map(t =>
                t.id === id ? { ...t, text } : t
            )
        },

        toggleTask(id) {
            this.tasks = this.tasks.map(t =>
                t.id === id ? { ...t, done: !t.done } : t
            )
        },

        deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id)
        }
    },

    persist: {
        key: 'tasks',
        paths: ['tasks'], // сохраняем только задачи
    }
})
