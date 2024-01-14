import {useUserStore} from "@/05-entities/user/userStore";
import {useCharactersStore} from "@/05-entities/characters/charactersStore";

export const g = {
    userStore: () => useUserStore(),
    charactersStore: () => useCharactersStore()
}