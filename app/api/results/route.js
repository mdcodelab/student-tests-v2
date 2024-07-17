export const GET = async (request) => {
    try {
    return new Response("Hello world!", {status: 200})
    } catch (error) {
      return new Response("Something was wrong!", {status: 500})
}
}