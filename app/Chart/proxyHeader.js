export const proxyHeader = {
    get(target, prop) {
        const value = target[prop];
        console.log(`Чтение свойства "${prop}":`, value);
        if (typeof value === 'object' && value !== null) {
            return new Proxy(value, proxyHeader);
        }
        return value;
    },
    set(target, prop, value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error(`Значение для свойства "${prop}" должно быть непустой строкой.`);
        }
        console.log(`Запись значения "${value}" в свойство "${prop}"`);
        target[prop] = value;
        return true;
    },
    deleteProperty(target, prop) {
        console.log(`Удаление свойства "${prop}"`);
        delete target[prop];
        return true;
    },
    defineProperty(target, prop, descriptor) {
        if ('value' in descriptor && (typeof descriptor.value !== 'string' || descriptor.value.trim() === '')) {
            throw new Error(`Значение для свойства "${prop}" должно быть непустой строкой.`);
        }
        console.log(`Добавление/обновление свойства "${prop}"`);
        Object.defineProperty(target, prop, descriptor);
        return true;
    }
};
