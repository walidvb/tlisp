require 'spec_helper'

describe Users::RegistrationsController do
  before do 
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  let :response_json do
    JSON.parse(response.body)
  end

  let! :clique do 
    Fabricate :clique, slug: 'test'
  end

  describe "POST #create" do
    context 'with valid parameters' do
      let :valid_parameters do 
        { user: {
            email: 'test@user.com',
            password: '1234',
            password_confirmation: '1234',
            clique_ids: [clique.id],
          },
        }
      end

      it "returns the new user" do
        post :create, valid_parameters.merge({format: :json})
        expect(response).to have_http_status(:success)
        expect(response_json['user']['email']).to eq(valid_parameters[:user][:email])
        expect(User.first.clique_ids.include?(clique.id)).to be_truthy
      end
    end

    context 'with invalid parameters' do 
      it 'returns the errors' do 
        post :create, { format: :json, 
          user: { email: 'test@user.com', password: '1234', password_confirmation: '4321'} ,
          clique: 'test'
        }
        expect(response).not_to have_http_status(:error)
      end
    end
  end

end
