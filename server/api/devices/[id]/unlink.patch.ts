export default defineEventHandler(async (event) => {
  checkUser(event)

  const id = event.context.params?.id

  const schema = z.object({
    id: z.string().regex(REGEX_ID)
  })

  schema.parse({ id })

  const device = await event.context.prisma.device.update({
    where: {
      id
    },
    data: {
      project: { disconnect: true }
    }
  }).catch((e) => { throw createPrismaError(e) })

  return device
})
