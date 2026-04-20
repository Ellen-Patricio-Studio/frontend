import { watch } from 'vue'

export function usePhoneMask(phoneRef) {
  const formatPhone = (val) => {
    if (!val) return ''
    
    let inputValue = val.replace(/\D/g, '') // Remove tudo que não é dígito
    if (inputValue.length > 11) inputValue = inputValue.slice(0, 11) // Limita a 11 números
    
    if (inputValue.length > 10) {
      inputValue = inputValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
    } else if (inputValue.length > 6) {
      inputValue = inputValue.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
    } else if (inputValue.length > 2) {
      inputValue = inputValue.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
    } else if (inputValue.length > 0) {
      inputValue = inputValue.replace(/^(\d*)/, '($1')
    }
    
    return inputValue
  }

  watch(phoneRef, (newVal) => {
    const formatted = formatPhone(newVal)
    if (newVal !== formatted) {
      phoneRef.value = formatted
    }
  })

  return { formatPhone }
}