'use client';
import { MouseEventHandler, useContext, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';
import { Button, CardOverlayContent, Input, Skeleton } from '@/components/elements/index';
import { USER_SETTINGS } from '@/utils/routes';
import { UPDATE_BRAND, updateBrandProps } from '@/graphql/brand/mutations/updateBrand';
import { BRAND, BrandProps } from '@/graphql/brand/queries/brand';
import { Brand } from '@/models/brand';
import { ColorLabelInput, FullFileInput, FullTextInput } from '../renderInputs/input';
import { BRANDS, BrandsProps } from '@/graphql/brand/queries/brands';
import { ButtonColor } from '../elements/form/button';
import { base64ToArrayBuffer, arrayBufferToBase64Svg } from '@/utils/utils';

const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;

export default function EditBrand({
	close
} : {
	close: MouseEventHandler<HTMLButtonElement>,
}) {
	const {addSnackNotification} = useContext(NotificationContext);

	const [brand, setBrand] = useState<Brand | null>(null);
	  
	const [
		updateBrand,
		{
			loading: updateBrandLoading,
		}] = useMutation<updateBrandProps>(UPDATE_BRAND, {
			onCompleted: (data) => {
				window.location.href = window.location.href.split('?')[0]
			},
			onError: (error) => {
				addSnackNotification(
					'Error while saving brand settings',
					error.message,
					SnackNotificationType.Error,
					undefined,
					undefined,
					undefined
				)
			}
		});

	useQuery<BrandsProps>(BRANDS, {
		onCompleted: (data) => {
			getBrand({
				variables: {
					uuid: data.brands[0].uuid
				}
			})
		},
		onError: (error) => {
			addSnackNotification(
				'Error while fetching brand data',
				error.message,
				SnackNotificationType.Error,
				undefined,
				undefined,
				undefined
			)
		}
	});

 	const [getBrand, {}] = useLazyQuery<BrandProps>(BRAND, {
		onCompleted: (data) => {
			setBrand(data.brand);
		},
		onError: (error) => {
			addSnackNotification(
				'Error while fetching brand data',
				error.message,
				SnackNotificationType.Error,
				undefined,
				undefined,
				undefined
			)
		}
	});

	if (!brand) {
		return <CardOverlayContent 
			title={'Brand'}
			close={close}>
			<h2 className='font-semibold mb-2'>
				Brand settings
			</h2>
			<p className='mb-2'>
				Enter the name, upload the logo and set your brand colors.
			</p>
			<Skeleton width='w-full'>
				<FullTextInput
						label='Name'
						value={''}
						setValue={() => {}}/>
				<FullFileInput
						label='Logo'
						value={null}
						setValue={(value) => {}}
						key='logo'
						text='SVG'
						accept='image/svg+xml'
						height='h-40'/>
				<div className='relative'>
					<div className='mb-2'>
						<ColorLabelInput
							labelText='Primary color'
							color={'#000000'}
							setColor={(color) => {}}/>
					</div>
					<div className='mb-2'>
						<ColorLabelInput
							labelText='Secondary color'
							color={'#000000'}
							setColor={(color) => {}}/>
					</div>
					<div className='mb-2'>
						<ColorLabelInput
							labelText='Teriary color'
							color={'#000000'}
							setColor={(color) => {}}/>
					</div>
					<div className='mb-2'>
						<ColorLabelInput
							labelText='Quaternary color'
							color={'#000000'}
							setColor={(color) => {}}/>
					</div>
					<div className='mb-6'>
						<ColorLabelInput
							labelText='Quinary color'
							color={'#000000'}
							setColor={(color) => {}}/>
					</div>
				</div>
				<Button buttonColor={ButtonColor.Black}>
					Save
				</Button>
			</Skeleton>
		</CardOverlayContent>
	}
  return <CardOverlayContent 
			title={'Brand'}
			close={close}>
		<h2 className='font-semibold mb-2'>
			Brand settings
		</h2>
		<p className='mb-2'>
			Enter the name, upload the logo and set your brand colors.
		</p>
		<form onSubmit={(e) => {
			e.preventDefault();
			updateBrand({
				variables: {
					'uuid': brand.uuid,
					'name': brand.name,
					'logo': brand.logo,
					'primary': brand.primary,
					'secondary': brand.secondary,
					'tertiary': brand.tertiary,
					'quaternary': brand.quaternary,
					'quinary': brand.quinary
				}
			}).then((result) => {
				// window.location.reload();
			})
		}}>
			<FullTextInput
				label='Name'
				value={brand.name}
				setValue={(value) => setBrand(
					{
						...brand,
						name: value
					}
				)}/>
			<FullFileInput
				label='Logo'
				value={brand.logo ? base64ToArrayBuffer(brand.logo) : null}
				setValue={(value: ArrayBuffer) => {
					setBrand(
						{
							...brand,
							logo: arrayBufferToBase64Svg(value)
						}
					)
				}}
				key='logo'
				text='SVG'
				accept='image/svg+xml'
				height='h-40'/>
			<div className='relative'>
				<div className='mb-2'>
					<ColorLabelInput
						labelText='Primary color'
						color={brand.primary}
						setColor={(color) => {
							if (hexColorRegex.test(color)){
								setBrand(
									{
										...brand,
										primary: color
									}
								)
							}
						}}/>
				</div>
				<div className='mb-2'>
					<ColorLabelInput
						labelText='Secondary color'
						color={brand.secondary}
						setColor={(color) => {
							if (hexColorRegex.test(color)){
								setBrand(
									{
										...brand,
										secondary: color
									}
								)
							}
						}}/>
				</div>
				<div className='mb-2'>
					<ColorLabelInput
						labelText='Teriary color'
						color={brand.tertiary}
						setColor={(color) => {
							if (hexColorRegex.test(color)){
								setBrand(
									{
										...brand,
										tertiary: color
									}
								)
							}
						}}/>
				</div>
				<div className='mb-2'>
					<ColorLabelInput
						labelText='Quaternary color'
						color={brand.quaternary}
						setColor={(color) => {
							if (hexColorRegex.test(color)){
								setBrand(
									{
										...brand,
										quaternary: color
									}
								);
							}
						}}/>
				</div>
				<div className='mb-6'>
					<ColorLabelInput
						labelText='Quinary color'
						color={brand.quinary}
						setColor={(color) => {
							if (hexColorRegex.test(color)){
								setBrand(
									{
										...brand,
										quinary: color
									}
								)
							}
						}}/>
				</div>
			</div>
			<Button buttonColor={ButtonColor.Black} loading={updateBrandLoading}>
				Save
			</Button>
		</form>
	</CardOverlayContent>
}
