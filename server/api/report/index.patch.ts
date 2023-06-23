import { handleError, prisma } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = checkUser(event);

    const data = await readBody<Report>(event);

    const report = await prisma.report.update({
      where: {
        userId,
      },
      data: data,
    });

    return report;
  } catch (error) {
    await handleError(error);
  }
});
