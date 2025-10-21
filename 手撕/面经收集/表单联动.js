class AdvancedFormProxy {
  constructor(config) {
    this.config = config;
    this.state = {};
    this.validators = new Map();
    this.observers = new Map();
    this.rules = [];

    this.proxy = this.createCompositeProxy();
  }

  createCompositeProxy() {
    return new Proxy(this.state, {
      set: (target, key, value) => {
        // 1. 验证
        if (this.validators.has(key)) {
          const isValid = this.validators.get(key)(value, target);
          if (!isValid) {
            throw new Error(`Validation failed for ${key}`);
          }
        }

        const oldValue = target[key];
        target[key] = value;

        // 2. 通知观察者
        this.notifyObservers(key, value, oldValue, target);

        // 3. 执行规则
        this.executeRules(key, value, oldValue, target);

        return true;
      },
    });
  }

  addValidator(field, validator) {
    this.validators.set(field, validator);
  }

  addObserver(field, callback) {
    if (!this.observers.has(field)) {
      this.observers.set(field, []);
    }
    this.observers.get(field).push(callback);
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  notifyObservers(field, newValue, oldValue, state) {
    if (this.observers.has(field)) {
      this.observers.get(field).forEach((callback) => {
        callback(newValue, oldValue, state);
      });
    }
  }

  executeRules(changedField, newValue, oldValue, state) {
    this.rules.forEach((rule) => {
      if (rule.triggerFields.includes(changedField)) {
        if (rule.condition(state)) {
          rule.action(state, newValue, oldValue);
        }
      }
    });
  }
}

// 创建复杂的表单联动
const userForm = new AdvancedFormProxy();

// 添加验证器
userForm.addValidator("email", (value) => {
  return /^\S+@\S+$/.test(value);
});

userForm.addValidator("age", (value, state) => {
  const age = parseInt(value);
  return !isNaN(age) && age >= 0 && age <= 150;
});

// 添加观察者
userForm.addObserver("country", (newValue, oldValue, state) => {
  if (newValue === "CN") {
    userForm.proxy.phonePrefix = "+86";
    userForm.proxy.timezone = "UTC+8";
  } else if (newValue === "US") {
    userForm.proxy.phonePrefix = "+1";
    userForm.proxy.timezone = "UTC-5";
  }
});

// 添加业务规则
userForm.addRule({
  triggerFields: ["age"],
  condition: (state) => parseInt(state.age) >= 65,
  action: (state) => {
    state.seniorDiscount = true;
    state.eligibleForRetirement = true;
  },
});

// 使用表单代理
userForm.proxy.name = "John Doe";
userForm.proxy.age = "25";
userForm.proxy.country = "US";
