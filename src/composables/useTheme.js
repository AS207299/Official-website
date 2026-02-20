import { ref, watch } from 'vue'

const STORAGE_KEY = 'hakuro-theme'

function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref(getInitialTheme())

function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem(STORAGE_KEY, t)
}

// Apply on load
applyTheme(theme.value)

watch(theme, (val) => {
    applyTheme(val)
})

export function useTheme() {
    function toggleTheme() {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }

    return {
        theme,
        toggleTheme,
    }
}
