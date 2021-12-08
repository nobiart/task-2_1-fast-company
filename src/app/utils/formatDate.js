export default function formatDate(date) {
    const postDate = new Date(parseInt(date));
    const nowDate = new Date();
    const diffYear = nowDate.getFullYear() - postDate.getFullYear();
    if (diffYear === 0) {
        const diffDay = nowDate.getDay() - postDate.getDay();
        if (diffDay === 0) {
            const diffHour = nowDate.getHours() - postDate.getHours();
            if (diffHour === 0) {
                const diffMinutes = nowDate.getMinutes() - postDate.getMinutes();
                if (diffMinutes >= 0 && diffMinutes < 5) return '1 minute ago';
                if (diffMinutes >= 5 && diffMinutes < 10) return '5 minutes ago';
                if (diffMinutes >= 10 && diffMinutes < 30) {
                    return '10 minutes ago';
                }
                return '30 minutes ago';
            }
            return `${postDate.getHours()}:${postDate.getMinutes()}`;
        }
        return `${postDate.getDay()} ${postDate.toLocaleString('default', {
            month: 'long'
        })}`;
    }
    return `${postDate.getFullYear()}.${(postDate.getMonth() + 1)}.${postDate.getDate()}`;
}
