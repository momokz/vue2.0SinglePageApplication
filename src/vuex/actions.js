export const activeMusic = ({
    commit
}, music) => {
    commit('ACTIVEMUSIC', music);
};

export const setLogin = ({
    commit
}, loginState) => {
    commit('SET_LOGIN', loginState);
}