
import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'icon',
        title: 'Icono (Emoji)',
        type: 'string',
        description: 'Ej: ⚾, 🧤, 👟'
    }),
  ],
})
