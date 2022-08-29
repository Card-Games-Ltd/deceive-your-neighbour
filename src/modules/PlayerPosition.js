export const getPlayerPosition = (players, playerIndex) => {
    if (playerIndex === 0) {
        return 'left';
    } else if ((playerIndex === 1 && players.length === 2) || playerIndex === 2) {
        return 'right';
    } else if (playerIndex === 1 && players.length === 3) {
        return 'top';
    } else {
        return null;
    }
}