/*
 * This is an example of a Rust smart contract with two simple, symmetric functions:
 *
 * 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
 *    who sent the request
 * 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
 *    "Hello"
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://github.com/near/near-sdk-rs
 *
 */

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, near_bindgen, setup_alloc, AccountId, Promise};

setup_alloc!();

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    memo: LookupMap<String, Vec<String>>,
}

impl Default for Welcome {
    fn default() -> Self {
        Self {
            memo: LookupMap::new(b"memo".to_vec()),
        }
    }
}

#[near_bindgen]
impl Welcome {
    // `match` is similar to `switch` in other languages; here we use it to default to "Hello" if
    // self.records.get(&account_id) is not yet defined.
    // Learn more: https://doc.rust-lang.org/book/ch06-02-match.html#matching-with-optiont

    // Change Methods
    pub fn add_memo(&mut self, receiver: String, memo_text: String) {
        let account_id = env::signer_account_id();
        let contains_user = self.memo.contains_key(&account_id);

        if contains_user {
            let mut temp_list = match self.memo.get(&account_id) {
                Some(x) => x,
                None => vec![],
            };

            temp_list.push(memo_text);
            self.memo.insert(&account_id, &temp_list);
        } else {
            let fresh_vec = vec![memo_text];
            self.memo.insert(&account_id, &fresh_vec);
        }
    }

    pub fn transfer_money(&mut self, account_id: AccountId, amount: f64) {
        Promise::new(account_id).transfer(amount as u128);
    }

    // View Methods
    pub fn get_memos(self, user: String) -> Vec<String> {
        match self.memo.get(&user) {
            Some(x) => x,
            None => vec![],
        }
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 *
 * To run from contract directory:
 * cargo test -- --nocapture
 *
 * From project root, to run in combination with frontend tests:
 * yarn test
 *
 */
