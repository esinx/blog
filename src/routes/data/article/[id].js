import { getArticleBySlug } from "./_articles";

export async function get(req, res) {
    const { id } = req.params;
    try {
        const result = await getArticleBySlug(id);
        return res.send(result);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}
