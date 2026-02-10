
import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio (USD Ref)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            }
          ]
        }
      ],
      validation: (rule) => rule.max(5),
    }),
    defineField({
        name: 'features',
        title: 'Características (Lista)',
        type: 'array',
        of: [{type: 'string'}],
    }),
    defineField({
        name: 'stock',
        title: 'Inventario Disponible',
        type: 'number',
        initialValue: 1
    }),
    defineField({
      name: 'isNew',
      title: '¿Es Nuevo?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
