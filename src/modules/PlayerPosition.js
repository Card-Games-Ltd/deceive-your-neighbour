export const getPlayerPosition = (players, playerIndex) => {
    if (playerIndex === 1) {
        return 'left';
    } else if ((playerIndex === 2 && players.length === 3) || playerIndex === 3) {
        return 'right';
    } else if (playerIndex === 2 && players.length === 4) {
        return 'top';
    } else {
        return null;
    }
}