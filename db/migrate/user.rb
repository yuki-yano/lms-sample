create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
  t.string   "provider",              default: "email", null: false
  t.string   "uid",                   default: "",      null: false
  t.string   "encrypted_password",    default: "",      null: false
  t.string   "reset_password_token"
  t.datetime "reset_password_sent_at"
  t.boolean  "allow_password_change", default: false
  t.datetime "remember_created_at"
  t.integer  "sign_in_count",         default: 0,       null: false
  t.datetime "current_sign_in_at"
  t.datetime "last_sign_in_at"
  t.string   "current_sign_in_ip"
  t.string   "last_sign_in_ip"
  t.string   "confirmation_token"
  t.datetime "confirmed_at"
  t.datetime "confirmation_sent_at"
  t.string   "unconfirmed_email"
  t.string   "name"
  t.string   "nickname"
  t.string   "email"
  t.text     "tokens"
  t.datetime "created_at",            null: false
  t.datetime "updated_at",            null: false
  t.string   "invitation_token"
  t.datetime "invitation_created_at"
  t.datetime "invitation_sent_at"
  t.datetime "invitation_accepted_at"
  t.integer  "invitation_limit"
  t.string   "invited_by_type"
  t.bigint   "invited_by_id"
  t.integer  "invitations_count",     default: 0

  t.index ["email"],                name: "index_users_on_email",                unique: true
  t.index ["invitation_token"],     name: "index_users_on_invitation_token",     unique: true
  t.index ["invitations_count"],    name: "index_users_on_invitations_count"
  t.index ["invited_by_id"],        name: "index_users_on_invited_by_id"
  t.index ["invited_by_type",       "invited_by_id"],                            name: "index_users_on_invited_by_type_and_invited_by_id"
  t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  t.index ["uid",                   "provider"],                                 name: "index_users_on_uid_and_provider", unique: true
end
