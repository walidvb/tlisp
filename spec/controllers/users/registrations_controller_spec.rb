require 'spec_helper'

describe Users::RegistrationsController do
  before do 
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  let :response_json do
    JSON.parse(response.body)
  end

  describe "POST #create" do
    context 'with valid parameters' do
      let :valid_parameters do 
        { user: {
            email: 'test@user.com',
            password: '1234',
            password_confirmation: '1234',
          }
        }
      end

      it "returns the new user" do
        post :create, valid_parameters.merge({format: :json})
        expect(response).to have_http_status(:success)
        expect(response_body['email']).to eq(valid_parameters[:user][:email])
      end
    end

    context 'with invalid parameters' do 
      it 'returns the errors' do 
        post :create, { format: :json, 
          user: { email: 'test@user.com', password: '1234', password_confirmation: '4321'} 
        }
        expect(response).to have_http_status(:success)
      end
    end
  end

end
