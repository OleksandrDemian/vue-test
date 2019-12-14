async function getUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let users = localStorage.getItem("users");
            if(users != null)
                resolve(JSON.parse(users));

            resolve([]);
        }, 250);
    });
}

async function storeUsers(users) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("users", JSON.stringify(users));
            resolve();
        }, 250);
    });
}

export default {
    async saveUser(user) {
        this.checkUsername(user.username);

        const users = await getUsers();
        user.id = new Date().getTime();
        users.push(user);
        await storeUsers(users);
    },

    async getUser(userId){
        const users = await getUsers();

        for(let i = 0; i < users.length; i++){
            if(users[i].id === userId){
                return users[i];
            }
        }

        throw new Error("User: " + userId + " does not exist.");
    },

    async login(username, password) {
        const users = await getUsers();

        for(let i = 0; i < users.length; i++){
            const user = users[i];
            if(user.username === username){
                if(user.password === password){
                    return user;
                } else {
                    throw new Error("Wrong password");
                }
            }
        }

        throw new Error("User: " + username + " does not exist.");
    },

    async checkUsername(username) {
        const users = await getUsers();

        for(let i = 0; i < users.length; i++){
            const user = users[i];
            if(user.username === username){
                throw new Error("Username already used");
            }
        }
    }
}