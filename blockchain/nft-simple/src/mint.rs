use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn nft_mint(&mut self, token_id: TokenId, metadata: String) {
        let initial_storage_usage = env::storage_usage();
        // self.assert_owner();
        let token = Token {
            owner_id: env::predecessor_account_id(),
            metadata,
            approved_account_ids: Default::default(),
            approval_id: 0,
        };
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );
        self.internal_add_token_to_owner(&token.owner_id, &token_id);
        self.total_supply += 1;
        self.token_ids.push(token_id);

        let new_token_size_in_bytes = env::storage_usage() - initial_storage_usage;
        let required_storage_in_bytes =
            self.extra_storage_in_bytes_per_token + new_token_size_in_bytes;

        deposit_refund(required_storage_in_bytes);
    }
}
