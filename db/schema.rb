# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_15_035001) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clique_memberships", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.integer "clique_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "clique_id"], name: "index_clique_memberships_on_user_id_and_clique_id", unique: true
  end

  create_table "cliques", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slack_url"
    t.index ["slug"], name: "index_cliques_on_slug", unique: true
  end

  create_table "curated_list_links", id: :serial, force: :cascade do |t|
    t.integer "curated_list_id", null: false
    t.integer "link_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["curated_list_id", "link_id"], name: "index_curated_list_links_on_curated_list_id_and_link_id", unique: true
    t.index ["curated_list_id"], name: "index_curated_list_links_on_curated_list_id"
    t.index ["link_id"], name: "index_curated_list_links_on_link_id"
  end

  create_table "curated_lists", id: :serial, force: :cascade do |t|
    t.string "source"
    t.string "url"
    t.string "host"
    t.string "title"
    t.string "description"
    t.string "image_url"
    t.string "site_name"
    t.integer "links_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "friendly_id_slugs", id: :serial, force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "link_clique_assignments", id: :serial, force: :cascade do |t|
    t.integer "clique_id"
    t.integer "link_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.boolean "visible", default: false
    t.string "played_by"
    t.string "heard_at"
    t.index ["clique_id"], name: "index_link_clique_assignments_on_clique_id"
    t.index ["link_id"], name: "index_link_clique_assignments_on_link_id"
  end

  create_table "links", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "oembed", default: "--- {}\n"
    t.text "description"
    t.boolean "published", default: true
    t.boolean "is_a_set", default: false
    t.integer "clique_id"
    t.integer "plays_count", default: 0
    t.integer "mood"
    t.boolean "oembeddable"
    t.string "title"
    t.string "mentions", default: [], array: true
    t.bigint "curated_list_id"
    t.index ["clique_id"], name: "index_links_on_clique_id"
    t.index ["curated_list_id"], name: "index_links_on_curated_list_id"
  end

  create_table "newsletters", id: :serial, force: :cascade do |t|
    t.string "email", null: false
    t.string "source"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", id: :serial, force: :cascade do |t|
    t.integer "target_id", null: false
    t.string "target_type", null: false
    t.integer "notifiable_id", null: false
    t.string "notifiable_type", null: false
    t.string "key", null: false
    t.integer "group_id"
    t.string "group_type"
    t.integer "group_owner_id"
    t.integer "notifier_id"
    t.string "notifier_type"
    t.text "parameters"
    t.datetime "opened_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["group_owner_id"], name: "index_notifications_on_group_owner_id"
    t.index ["group_type", "group_id"], name: "index_notifications_on_group_type_and_group_id"
    t.index ["notifiable_type", "notifiable_id"], name: "index_notifications_on_notifiable_type_and_notifiable_id"
    t.index ["notifier_type", "notifier_id"], name: "index_notifications_on_notifier_type_and_notifier_id"
    t.index ["target_type", "target_id"], name: "index_notifications_on_target_type_and_target_id"
  end

  create_table "playlist_assignments", id: :serial, force: :cascade do |t|
    t.integer "playlist_id"
    t.integer "link_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id", "link_id"], name: "index_playlist_assignments_on_playlist_id_and_link_id", unique: true
  end

  create_table "playlists", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "plays", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "link_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscriptions", id: :serial, force: :cascade do |t|
    t.integer "target_id", null: false
    t.string "target_type", null: false
    t.string "key", null: false
    t.boolean "subscribing", default: true, null: false
    t.boolean "subscribing_to_email", default: true, null: false
    t.datetime "subscribed_at"
    t.datetime "unsubscribed_at"
    t.datetime "subscribed_to_email_at"
    t.datetime "unsubscribed_to_email_at"
    t.text "optional_targets"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["key"], name: "index_subscriptions_on_key"
    t.index ["target_type", "target_id", "key"], name: "index_subscriptions_on_target_type_and_target_id_and_key", unique: true
    t.index ["target_type", "target_id"], name: "index_subscriptions_on_target_type_and_target_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.integer "taggable_id"
    t.string "taggable_type"
    t.integer "tagger_id"
    t.string "tagger_type"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.boolean "admin", default: false, null: false
    t.boolean "locked", default: false, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "name"
    t.string "auth_token", default: "asd", null: false
    t.string "initials"
    t.integer "plays_count", default: 0
    t.integer "link_clique_assignments_count", default: 0
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "playlists", "users"
end
