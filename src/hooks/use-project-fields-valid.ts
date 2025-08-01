import { useAtomValue } from 'jotai'
import { projectFormAtom, type ProjectEntity } from '../store/project-store'

type SimpleField = keyof ProjectEntity
type AdvancedField = Partial<Record<SimpleField, unknown>>
type FieldInput = (SimpleField | AdvancedField)[]

/**
 * Vérifie la validité de champs dans le projectFormAtom.
 * Accepte un mélange de :
 * - clés simples : "type"
 * - objets avancés : { client: [...] }
 */
export const useProjectFormFieldsValid = (input: FieldInput): boolean => {
  const form = useAtomValue(projectFormAtom)

  return input.every((entry) => {
    // Format simple : "type"
    if (typeof entry === 'string') {
      const value = form[entry]
      if (Array.isArray(value)) {
        return value.length > 0 && value.some((v) => v !== '')
      }
      return Boolean(value)
    }

    // Format avancé : { client: [...] }
    if (typeof entry === 'object' && entry !== null) {
      return Object.entries(entry).every(([key, expectedValue]) => {
        const formValue = form[key as SimpleField]
        if (Array.isArray(formValue)) {
          return formValue.length > 0 && formValue.some((v) => v !== '')
        }
        return Boolean(formValue)
      })
    }

    return false
  })
}
